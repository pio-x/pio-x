<?php
class AddHeaders
{
	/**
	 * Example middleware invokable class
	 *
	 * @param  \Psr\Http\Message\ServerRequestInterface $request  PSR7 request
	 * @param  \Psr\Http\Message\ResponseInterface      $response PSR7 response
	 * @param  callable                                 $next     Next middleware
	 *
	 * @return \Psr\Http\Message\ResponseInterface
	 */
	public function __invoke($request, $response, $next)
	{
		$response = $response->withHeader('Access-Control-Allow-Origin', '*');

		if ($request->getMethod() == 'OPTIONS') {
			$response = $response->withHeader('Access-Control-Allow-Headers', 'Content-Type, X-Piox-Team, X-Piox-Player, X-Piox-Hash, X-Piox-Location');
			$response = $response->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			return $response;
		}

		return $next($request, $response);
	}
}
