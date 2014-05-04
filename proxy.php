<?php
/**
 * Because of the Access-Control-Allow-Origin impediment I'm using a proxy to make the requests to the API
 * If the JS would be on the same domain, this would not be needed!
 */

//Set the Reporting ON
error_reporting(E_ALL);
ini_set('display_errors', 1);

$headers = apache_request_headers();

/**
 * Make sure there is some data sent via POST
 * Otherwise exit;
 */
if (! empty($_POST)) {

    $method = (isset($_POST['method'])) ? $_POST['method'] : 'GET';
    $data = (isset($_POST['data'])) ? $_POST['data'] : '';

    $result = http(
        $_POST['endpoint'],
        $method,
        $data
    );

    http_response_code(getStatusCode($result->raw_headers));
    echo $result;

} else {
    http_response_code('406');
    echo '<pre>';
    print_r($headers);
    echo '</pre>';
    exit ('No data sent! Exit.');
}

/**
 * @param $url
 * @param string $method
 * @param null $data
 * @return \Httpful\associative|string
 */
function http($url, $method = 'GET', $data)
{
    global $headers;

    // bring in the library to handle the CURL requests
    require_once(__DIR__.'/httpful.phar');

    if ($method == 'POST') {
        $result = \Httpful\Request::post($url)->
            body($data);
    } else {
        $result = \Httpful\Request::get($url);
    }

    if ($method == 'GET') {
        $result->expectsJSON();
    }

    if (isset($headers['Authorization'])) {
        $result->addHeader('Authorization', $headers['Authorization']);
    }
//
//    foreach ($headers as $headerName => $headerValue) {
//        if (in_array($headerName, array(
//            'Host',
//            'Connection',
//            'Content-Length',
//            'Cache-Control',
//            'Pragma',
//            'Referer',
//            'Cookie',))
//        ) continue;
//
//        //$result->addHeader($headerName.':', $headerValue);
//    }

    $result->addHeader('Accept:', 'application/json');

    if (isset($headers['API-Version'])) {
        $result->addHeader('API_Version:', $headers['API-Version']);
    }

    $result->sendsJson();

    return $result->send();
}


function getStatusCode($rawHeaders) {

    // escape special characters in the query
    $pattern = preg_quote('Status: ', '/');
    // finalise the regular expression, matching the whole line
    $pattern = "/^.*$pattern.*\$/m";

    $match = false;

    if(preg_match($pattern, $rawHeaders, $match)){
        //$match = substr(strpos('Status ', $match[0]))
        if (preg_match('!\d+!', $match[0], $match)) {
            $match = $match[0];
        }
    }



    return $match;
}