# needs gsjson from npm installed.
data-update:
	gsjson 1XSMFslxz6zzjRcgmm3QeWbjJzR9wte9KQkyYwn_pU7k -b -w 0 organizations.json	
	gsjson 1XSMFslxz6zzjRcgmm3QeWbjJzR9wte9KQkyYwn_pU7k -b -w 1 cities.json	

deploy: data-update
	npm run build
	rsync -Paz --delete dist/ web12.time.map.qmax.us:/srv/www/europe.miazo.net/
