function tcdr(tcdr){

    var screen_names = [];

    // First check the og data
    // console.log("Checking og data");
    var meta = document.querySelector('meta[name="twitter:site"]');
    if(meta !== undefined && meta !== null){
        screen_names.push(meta.content.replace('@',''));
        // console.log('Found screen name from meta: ' + screen_names);
    }

    // look for a basic follow link
    // console.log("Checking basic follow links");
    var follow_links = document.querySelectorAll('[title="Follow us on Twitter"]');
    if(follow_links.length > 0){
        for (var i = follow_links.length - 1; i >= 0; i--) {
            var link_split = follow_links[i].href.split('/');
            screen_names.push(link_split[link_split.length-1]);
            // console.log('Found screen name from link: ' + screen_names);
        };
    }

    // look for a basic follow button
    // console.log("Checking follow buttons");
    var follow_frames = document.querySelectorAll('iframe.twitter-follow-button');
    if(follow_frames.length > 0){
        for (var i = follow_frames.length - 1; i >= 0; i--) {
            var src_split = follow_frames[i].src.split('&');
            // console.log('Found frame: ');
            // console.log(src_split);
            for(var j=0; j<src_split.length; j++){
                var part = src_split[j];
                if(part.indexOf('screen_name') === 0){
                    screen_names.push(src_split[j].split('=')[1]);
                    // console.log('Found screen name from follow frame: ' + screen_names);
                }
            }
        }
    }

    var tweet = "@" + screen_names.join(' @') + " Tab Closed; Didn't Read " + document.URL + " #tcdr";

    var tweetURL = 'https://twitter.com/intent/tweet?source=webclient&text=' + encodeURIComponent(tweet);

    document.location.href = tweetURL;

}

// This allows the above function to be used for other browser extensions.
if (typeof safari != 'undefined') {
    safari.self.addEventListener("message", tcdr, false);
}
