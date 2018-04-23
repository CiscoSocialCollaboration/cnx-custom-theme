'use strict';

function ciscoMod (repoName) {

  var ciscoConfig = {
    default: {
      globalNotification: 'This is an early access environment, not yet fully approved for Cisco business data. DO NOT post any new Cisco business data here. Users who violate the <a href="https://apps.na.collabserv.com/wikis/home?lang=en-us#!/wiki/Wb45fb83ec81b_4af8_b66a_622c70dd8a0e/page/Terms%20and%20Conditions">Terms &amp; Conditions</a> of use may have their access revoked.',
      dataAdvisorToolLink: 'https://dataadvisor.cloudapps.cisco.com/da/cwizard',
      contactUsLink: 'https://apps.na.collabserv.com/communities/service/html/communityoverview?communityUuid=9a9fcf41-bf9b-4165-8a1b-9a99705539bb',
      touLink: 'https://apps.na.collabserv.com/wikis/home?lang=en-us#!/wiki/Wb45fb83ec81b_4af8_b66a_622c70dd8a0e/page/Terms%20and%20Conditions',
      employeeCommunities: 'https://apps.na.collabserv.com/social/home'
    },
    'Cisco-PreProd': {
      globalNotification: 'This is a test environment and is not approved for Cisco business data. All content in this environment will be deleted after the Sandbox Access Program ends.<a id="EcHelp" href="https://apps.na.collabserv.com/wikis/home?lang=en-us#!/wiki/W30ba0f26bd6c_4709_9b3e_5c9021a07d39"> Get started in Employee Communities Help</a>.',
      dataAdvisorToolLink: 'https://dataadvisor.cloudapps.cisco.com/da/cwizard',
      contactUsLink: 'https://apps.na.collabserv.com/communities/service/html/communitystart?communityUuid=77a94da2-f2ca-4bed-ab3c-97eff1992880',
      touLink: 'https://apps.na.collabserv.com/wikis/home?lang=en-us#!/wiki/W30ba0f26bd6c_4709_9b3e_5c9021a07d39/page/Terms%20and%20Conditions',
      employeeCommunities: 'https://apps.na.collabserv.com/homepage/web/updates/#myStream/imFollowing/all'
    }
  }

  if (!ciscoConfig[repoName]) repoName = 'default';
  console.log ('Cisco Customization: ', repoName);
  var config = ciscoConfig[repoName];

  /**
   * Hide Default Navigation Bar first
   *
   * here we use waitFor to wait on the .lotusStreamTopLoading div.loaderMain.lotusHidden element
   * before we proceed to customize the page...
   */
  waitFor( function() {
    // wait until the "loading..." node has been hidden
    // indicating that we have loaded content.
    var navbar = document.getElementById("nav_bar_include");
    navbar.style.top = "-90px";
  }, "div#nav_bar_include");

  /**
   * Top Nav Bar Customization
   */
  waitFor( function() {
    // Cisco Confidential
    $('body').prepend('<div id="cisco_confidential"></div>')
    if (config.globalNotification) showGlobalNotification(config.globalNotification);
    $('#nav_bar_include').prepend('<a id="cisco_logo" href="http://wwwin.cisco.com/c/cec/index.html" target="_parent"><img id="white_logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAA/CAMAAABaUV+eAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABC1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAACJg4+MAAAAV3RSTlMAhfP8+fQqn+T98cNjzuaioFf3b1j4Veivu+FrWSwrrA0O16VFDOX7FcHunBPjREDiJ9/2QgbnFghfxs8JD8ejrp4L4Oqxv5JwW3311ChW8P5Tm/rpvCn6aBF7AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAZNJREFUWMPtlHlPwkAQxQcprYCCoAXEC5VDwSLe94EH3gcevO//TSzutrLG1G4TQ9R9f/Rt+yMvw8xkiZSUlJSU/oFCA6FAzJfC0AIxXwIQiP3VcD4tHiDOzov5Ep8WDxBn58Vk+iGaDybTD9F8MJl+iOaDBeiHf+tjOP97X26ED/bNQCOhHnOmJXz0YjL60YvLq54AtSr1T7oxGI3Fyd24oeFIIi4S0pOJaGJEl85OpQEWy56jziuNmc4xw36TzsjWrQHZ3HjEDc8jNjGZsw9TLpnWwKRJ1p4EZgpEs264ibnCO5l3iQHki6ViHjDkwsuoLPAjC18EqjWdkSUGLKBu2zLQkAsPo0xC+Mqq7WvrRBVYHNhdKdm2AdlrYBPhLSGctnd2gb1u5Q5pBK3c7nlun+iAei/qQ6SJjoBjRpp2z+sn9VOgKRfe3YSz89bHtlxcXl3f4JZtCyO6ybfFvJMLp/tPe/7QfXtMCaTN97wtmW1P8KkRrrbc8Fb2+eW1yEiNE+oYVsVqdqSzlZSUlJR+l94AvJKDSileXj4AAAAASUVORK5CYII="/></a><a id="employee_communities" href="'+config.employeeCommunities+'">Employee Communities</a>')
  }, 'div#nav_bar_include a.activities')

  /**
   * Footer Customization
   *
   * here we use waitFor to wait on the .lotusStreamTopLoading div.loaderMain.lotusHidden element
   * before we proceed to customize the page...
   */
  waitFor( function(){
    // wait until the "loading..." node has been hidden
    // indicating that we have loaded content.
    var isInIFrame = (window.location != window.parent.location);
    if(!isInIFrame) {
      var footerElement = document.getElementsByClassName("lotusFooter")[0].getElementsByTagName("ul")[0]
      if (config.contactUsLink)
        footerElement.childNodes[1].getElementsByTagName("a")[0].href = config.contactUsLink;
      if (config.touLink)
        footerElement.childNodes[2].getElementsByTagName("a")[0].href = config.touLink;
      if (config.dataAdvisorToolLink) {
        var DAT = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute('href', config.dataAdvisorToolLink);
        a.setAttribute('id', "dataAdvisorTool");
        var DATextNode = document.createTextNode("Data Advisor Tool");
        a.appendChild(DATextNode);
        a.setAttribute('target', '_blank');
        DAT.appendChild(a);
        footerElement.appendChild(DAT);
      }
      footerElement.childNodes[0].style.display = 'none';
      footerElement.childNodes[3].style.display = 'none';
      footerElement.childNodes[4].style.display = 'none';
      footerElement.childNodes[5].style.display = 'none';
    }
  }, "div.lotusFooter .lotusFooter ul");
}

function showGlobalNotification (htmlMessage) {
  $('body').prepend('<div id="cisco_homeAnnouncement"><span>' + htmlMessage + '</span></div>')
}

// utility function to let us wait for a specific element of the page to load...
// (Provided by IBM)
function waitFor (callback, elXpath, elXpathRoot, maxInter, waitTime) {
  if(!maxInter) var maxInter = 3000;  // number of intervals before expiring
  if(!waitTime) var waitTime = 10;  // 1000=1 second
  if(!elXpath) return;
  var waitInter = 0;  // current interval
  var intId = setInterval( function(){
      if(typeof(dojo) == "undefined") return;
      if(!elXpathRoot) var elXpathRoot = dojo.body();
      if(++waitInter<maxInter && !dojo.query(elXpath,elXpathRoot).length) return;

      clearInterval(intId);
      if( waitInter >= maxInter) {
          console.log("**** WAITFOR ["+elXpath+"] WATCH EXPIRED!!! interval "+waitInter+" (max:"+maxInter+")");
      } else {
          console.log("**** WAITFOR ["+elXpath+"] WATCH TRIPPED AT interval "+waitInter+" (max:"+maxInter+")");
          callback();
      }
  }, waitTime);
};
