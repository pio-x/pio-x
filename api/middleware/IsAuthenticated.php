<?php
class IsAuthenticated
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
		// check if hash is present in headers
		$hash = $request->getHeaderLine('X-Piox-Hash');
		if (!$hash) {
			// alternatively, check if hash is passed by query params
			$params = $request->getQueryParams();
			if (isset($params['hash'])) {
				$hash = $params['hash'];
			}
		}

		// no hash provided
		if (!$hash) {
			return $response->withStatus(401, 'Not authenticated');
		}

		// check if hash is valid
		$teams = $this->DB->fetchAll("SELECT t_ID FROM team WHERE hash = ?", array($hash));
		if (count($teams) > 0) {
			// set request attributes for later use
			$request = $request->withAttribute('team_id', $teams[0]['t_ID']);
			$request = $request->withAttribute('is_team', true);
			$request = $request->withAttribute('is_mrx', false);
			$request = $request->withAttribute('is_admin', false);

			// continue with request
			return $next($request, $response);
		} else {
			return $response->withStatus(401, 'Invalid authentication hash');
		}
	}
}
