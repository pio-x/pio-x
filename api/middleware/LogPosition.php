<?php
class LogPosition
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
		// check if location info is present in headers
		$location = $request->getHeaderLine('X-Piox-Location');
		$player = $request->getHeaderLine('X-Piox-Player');
		if ($location) {
			$location = json_decode($location, true);
			if (isset($location['lat']) && $request->getAttribute('team_id')) {
				$data = [
					't_ID' => $request->getAttribute('team_id'),
					'team_lat' => $location['lat'],
					'team_long' => $location['lng'],
					'player' => urldecode($player)
				];
				try {
					$this->DB->insert('teamposition', $data);
				} catch (Exception $e) {
					// catch "1366 Incorrect string value: '\xE4' for column 'player'" errors
					// and insert a default name
					$data['player'] = '__unknown__';
					$this->DB->insert('teamposition', $data);
				}
			}
		}

		return $next($request, $response);
	}
}
