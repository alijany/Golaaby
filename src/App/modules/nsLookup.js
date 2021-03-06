const dns = require('dns');
const { Resolver } = dns;
var resolver = new Resolver();

var timer;

/**
 * set DNS servers for resolver
 * @param {Array} DNS_array ip of static DNS servers
 */
function setDNS_Servers(DNS_array) {
    resolver.setServers(DNS_array);
}

/**
 * Retrieves time of resolving a domain
 * @export
 * @param {Array} DNS_array ip of static DNS servers 
 * @param {string} [dist='google.com'] domain to resolve
 * @returns {Promise}  that fulfills with the time of dns resolving
 */
export function measure(DNS_array, dist = 'google.com') {
    return new Promise(resolve => {
        //cancel old resolver
        resolver.cancel(); 
        clearTimeout(timer);

        DNS_array && setDNS_Servers(DNS_array);
        var time = new Date().getTime();
        resolver.resolve4(dist, (err, addresses) => {
            let result;
            result = (!err && addresses) ? new Date().getTime() - time : undefined;
            resolve(result)
        });

        // Set up the timeout
        timer = setTimeout(function () {
            resolver.cancel();
            resolve(false)
        }, 3000);
    });
}

/**
 * dns server of network interface which is up
 * @export
 * @returns {Array} ip of static DNS servers 
 */
export function getDNS_Servers() {
    return dns.getServers()
};
