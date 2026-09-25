'use strict';
const link=document.getElementById('staff-sign-in'),url=window.RATAN_STAFF_URL;
if(/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url||'')){link.href=url;link.hidden=false;document.getElementById('setup-pending').hidden=true;}
