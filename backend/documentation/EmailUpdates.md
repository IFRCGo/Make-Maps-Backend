## Constants

<dl>
<dt><a href="#StartMapSubscription">StartMapSubscription</a> ⇒ <code>void</code></dt>
<dd><p>Starts a cron job that runs every 30 seconds to check for updates on disasters, pins and drawing layers.
 If any updates are found, sends an email to all subscribers and updates the last sent email time for the disaster.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#emailBody">emailBody(arr)</a> ⇒ <code>string</code></dt>
<dd><p>Returns an HTML formatted string that contains the body of an email.</p>
</dd>
</dl>

<a name="StartMapSubscription"></a>

## StartMapSubscription ⇒ <code>void</code>
Starts a cron job that runs every 30 seconds to check for updates on disasters, pins and drawing layers.
 If any updates are found, sends an email to all subscribers and updates the last sent email time for the disaster.

**Kind**: global constant  
<a name="emailBody"></a>

## emailBody(arr) ⇒ <code>string</code>
Returns an HTML formatted string that contains the body of an email.

**Kind**: global function  
**Returns**: <code>string</code> - - An HTML formatted string that contains the body of an email.  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;string&gt;</code> | An array of strings that make up the body of an email. |

