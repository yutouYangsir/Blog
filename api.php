<?php
if (php_sapi_name() !== "cli") {
    header("Content-Type: application/json; charset=utf-8");
}

function to_utf8($str) {
    $enc = mb_detect_encoding($str, array("ASCII", "UTF-8", "GBK"), true);
    if ($enc && $enc !== "UTF-8") {
        return mb_convert_encoding($str, "UTF-8", $enc);
    }
    return $str;
}

function collect_md_entries($dir, $prefix = "") {
    $result = array();
    $entries = scandir($dir);
    foreach ($entries as $e) {
        if ($e === "." || $e === "..") continue;
        $path = $dir . "/" . $e;
        $name = to_utf8($e);
        if (is_dir($path)) {
            $result = array_merge($result, collect_md_entries($path, $prefix . $name . "/"));
        } elseif (strtolower(pathinfo($name, PATHINFO_EXTENSION)) === "md") {
            $result[] = array("path" => $path, "name" => $prefix . $name);
        }
    }
    return $result;
}

function collect_tree($dir, $prefix = "") {
    $nodes = array();
    $entries = scandir($dir);
    foreach ($entries as $e) {
        if ($e === "." || $e === "..") continue;
        $path = $dir . "/" . $e;
        $name = to_utf8($e);
        $rel = $prefix . $name;
        if (is_dir($path)) {
            $nodes[] = array(
                "type" => "dir",
                "name" => $name,
                "path" => $rel,
                "children" => collect_tree($path, $rel . "/")
            );
        } elseif (strtolower(pathinfo($name, PATHINFO_EXTENSION)) === "md") {
            $nodes[] = array("type" => "file", "name" => $name, "path" => $rel);
        }
    }
    return $nodes;
}

$action = isset($_GET["action"]) ? $_GET["action"] : "";

if ($action === "list") {
    $blogsDir = __DIR__ . "/blogs";
    $blogs = array();
    if (is_dir($blogsDir)) {
        $folders = scandir($blogsDir);
        foreach ($folders as $folder) {
            if ($folder === "." || $folder === "..") continue;
            $folderPath = $blogsDir . "/" . $folder;
            if (is_dir($folderPath)) {
                $mdEntries = collect_md_entries($folderPath);
                $mdNames = array();
                $relFiles = array();
                foreach ($mdEntries as $entry) {
                    if (strpos($entry["name"], "/") === false) {
                        $mdNames[] = $entry["name"];
                    }
                    $relFiles[] = $entry["name"];
                }
                $blogs[] = array(
                    "name" => to_utf8($folder),
                    "folder" => to_utf8($folder),
                    "mdFiles" => $mdNames,
                    "files" => $relFiles
                );
            }
        }
    }
    array_multisort($blogs);
    echo json_encode($blogs, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === "search") {
    $q = isset($_GET["q"]) ? trim($_GET["q"]) : "";
    if ($q === "") {
        echo json_encode(array());
        exit;
    }

    $blogsDir = __DIR__ . "/blogs";
    $results = array();
    if (is_dir($blogsDir)) {
        $folders = scandir($blogsDir);
        foreach ($folders as $folder) {
            if ($folder === "." || $folder === "..") continue;
            $folderPath = $blogsDir . "/" . $folder;
            if (!is_dir($folderPath)) continue;

            $folderName = to_utf8($folder);
            $folderHit = mb_stripos($folderName, $q, 0, "UTF-8") !== false;
            $mdEntries = collect_md_entries($folderPath);

            foreach ($mdEntries as $mdEntry) {
                $fileName = $mdEntry["name"];
                $content = to_utf8(file_get_contents($mdEntry["path"]));
                $nameHit = mb_stripos($fileName, $q, 0, "UTF-8") !== false;
                $pos = mb_stripos($content, $q, 0, "UTF-8");

                if (!$folderHit && !$nameHit && $pos === false) continue;

                $snippet = "";
                if ($pos !== false) {
                    $contentLen = mb_strlen($content, "UTF-8");
                    $start = max(0, $pos - 30);
                    $length = min(90, $contentLen - $start);
                    $snippet = mb_substr($content, $start, $length, "UTF-8");
                    if ($start > 0) $snippet = "..." . $snippet;
                    if ($start + $length < $contentLen) $snippet .= "...";
                } else {
                    $text = preg_replace('/\s+/u', " ", $content);
                    $snippet = mb_substr(trim($text), 0, 90, "UTF-8");
                }
                $snippet = trim(preg_replace('/\s+/u', " ", $snippet));

                $results[] = array(
                    "folder" => $folderName,
                    "file" => $fileName,
                    "snippet" => $snippet,
                    "nameMatch" => ($folderHit || $nameHit)
                );
            }
        }
    }

    usort($results, function ($a, $b) {
        return ($b["nameMatch"] ? 1 : 0) - ($a["nameMatch"] ? 1 : 0);
    });
    echo json_encode($results, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === "files") {
    $folder = isset($_GET["folder"]) ? $_GET["folder"] : "";
    $blogsDir = __DIR__ . "/blogs";
    $folders = scandir($blogsDir);
    $found = false;

    foreach ($folders as $f) {
        if ($f === "." || $f === "..") continue;
        if (to_utf8($f) === $folder) {
            $relFiles = array();
            foreach (collect_md_entries($blogsDir . "/" . $f) as $entry) {
                $relFiles[] = $entry["name"];
            }
            echo json_encode($relFiles, JSON_UNESCAPED_UNICODE);
            $found = true;
            break;
        }
    }

    if (!$found) {
        if (php_sapi_name() !== "cli") {
            http_response_code(404);
        }
        echo json_encode(array("error" => "Folder not found"));
    }
    exit;
}

if ($action === "tree") {
    $folder = isset($_GET["folder"]) ? $_GET["folder"] : "";
    $blogsDir = __DIR__ . "/blogs";
    $folders = scandir($blogsDir);
    $found = false;

    foreach ($folders as $f) {
        if ($f === "." || $f === "..") continue;
        if (to_utf8($f) === $folder) {
            $folderPath = $blogsDir . "/" . $f;
            $relFiles = array();
            foreach (collect_md_entries($folderPath) as $entry) {
                $relFiles[] = $entry["name"];
            }
            echo json_encode(array(
                "files" => $relFiles,
                "tree" => collect_tree($folderPath)
            ), JSON_UNESCAPED_UNICODE);
            $found = true;
            break;
        }
    }

    if (!$found) {
        if (php_sapi_name() !== "cli") {
            http_response_code(404);
        }
        echo json_encode(array("error" => "Folder not found"));
    }
    exit;
}

if ($action === "content") {
    // Only accept folder name, not full path - avoids encoding issues
    $folder = isset($_GET["folder"]) ? $_GET["folder"] : "";
    $file = isset($_GET["file"]) ? trim($_GET["file"]) : "";
    $blogsDir = __DIR__ . "/blogs";
    $folders = scandir($blogsDir);
    $found = false;

    foreach ($folders as $f) {
        if ($f === "." || $f === "..") continue;
        if (to_utf8($f) === $folder) {
            $folderPath = $blogsDir . "/" . $f;
            $mdEntries = collect_md_entries($folderPath);
            $target = null;
            if ($file === "") {
                $target = !empty($mdEntries) ? $mdEntries[0]["path"] : null;
            } else {
                $wanted = str_replace("\\", "/", $file);
                foreach ($mdEntries as $entry) {
                    if (str_replace("\\", "/", $entry["name"]) === $wanted) {
                        $target = $entry["path"];
                        break;
                    }
                }
            }
            if ($target !== null) {
                if (php_sapi_name() !== "cli") {
                    header("Content-Type: text/plain; charset=utf-8");
                }
                echo to_utf8(file_get_contents($target));
                $found = true;
            }
            break;
        }
    }

    if (!$found) {
        if (php_sapi_name() !== "cli") {
            http_response_code(404);
        }
        echo "File not found";
    }
    exit;
}

if (php_sapi_name() !== "cli") {
    http_response_code(400);
}
echo json_encode(array("error" => "Invalid action"));
