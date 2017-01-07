<?php
class Authentication
{
	private $DB;

	public function __construct(\Doctrine\DBAL\Connection $DB) {
		$this->DB = $DB;
	}

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
		$hash = null;

		// 1. QUERY PARAM: check if hash is passed with query params (e.g: /team?hash=xxx)
		$params = $request->getQueryParams();
		if (isset($params['hash'])) {
			$hash = $params['hash'];
		} else {
			// 2. HEADERS: check if hash is present in headers
			$hash = $request->getHeaderLine('X-Piox-Hash');
			if (!$hash) {
				// 3. COOKIE: check if hash is present in cookie
				// document.cookie = "piox_hash=111; path=/; domain=.pio-x.ch";
				if (isset($_COOKIE['piox_hash'])) {
					$hash = $_COOKIE['piox_hash'];
				}
			}
		}

		// no hash provided
		if (!$hash) {
			return $response->withStatus(401)->withJson('No hash provided');
		}

		// TEAM: check if hash is valid
		$teams = $this->DB->fetchAll("SELECT t_ID FROM team WHERE hash = ?", array($hash));
		if (count($teams) > 0) {
			// set request attributes for later use
			$request = $request->withAttribute('is_team', true);
			$request = $request->withAttribute('team_id', $teams[0]['t_ID']);

			// continue with request
			return $next($request, $response);
		}

		// ADMIN: check if hash is valid
		$users = $this->DB->fetchAll("SELECT u_ID FROM user WHERE hash = ?", array($hash));
		if (count($users) > 0) {
			// set request attributes for later use
			$request = $request->withAttribute('is_admin', true);
			$request = $request->withAttribute('admin_id', $users[0]['u_ID']);

			// continue with request
			return $next($request, $response);
		}

		// MRX: check if hash is valid
		$mrxs = $this->DB->fetchAll("SELECT x_ID FROM mrx WHERE x_hash = ?", array($hash));
		if (count($mrxs) > 0) {
			// set request attributes for later use
			$request = $request->withAttribute('mrx_id', $mrxs[0]['x_ID']);
			$request = $request->withAttribute('is_mrx', true);

			// continue with request
			return $next($request, $response);
		}

		return $response->withStatus(401)->withJson('Invalid authentication hash');
	}
}
