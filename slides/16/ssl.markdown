---
layout: slides
title: "TLS/SSL"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## TLS/SSL

SSL is usually used to refer to two cryptographic protocols:

* __TLS__ - transport layer security
* __SSL__ - secure sockets layer (precedes TLS, but acronym more well-known)

<br>
On the web, SSL, as a protocol, sits between TCP/IP and HTTP (well &lt;-- this can be other protocols too, like FTP). It ensures that:

* {:.fragment} communication between two computers on a network are __private__
* {:.fragment} __identities__ of at least one of the endpoints are proven
* {:.fragment} ... and messages sent between computers are __not tampered__ with.

</section>
<section markdown="block">
## Privacy

A connection made through SSL/TLS is made private through __symmetric cryptography__.  __Wait, what's that?__ &rarr;

* {:.fragment} same key is used for encryption of plain text into _cipher_ text (encrypted text), as well as decryption back to plain text. __uh, what's a key?__ &rarr;
* {:.fragment} it's just a piece of data (think parameter in a function) given to a cryptographic algorithm that determines its output. __example please... anyone know the caesar cipher or any substitution ciphier?__ &rarr;
* {:.fragment} caesar uses _shift_ as key, substitution cipher may use a _keyword_

</section>

<section markdown="block">
## Encryption - Motivation

__How does encryption work for ensuring privacy?__ &rarr;

* {:.fragment} if there are eavesdroppers...
* {:.fragment} messages won't be in plain text
* {:.fragment} so, while they can observe that communication is occurring, they won't know what the content is...

</section>

<section markdown="block">
## Verified Identity

* identity is verified by a _cryptographically signed_ certificate from a trusted [certificate authority](https://en.wikipedia.org/wiki/Certificate_authority) that the server supplies to the client
* this is an __SSL Certificate__
* it's basically a way for the server to prove that they are they say they are
* __why does this matter?__ &rarr;
    * {:.fragment} so ... some malicious 3rd party can't masquerade as the server / site


</section>

<section markdown="block">
## Message Integrity

A [message authentication code](https://en.wikipedia.org/wiki/Message_authentication_code) is a code that can be used to confirm:

* that a message hasn't been tampered with
* and that it's coming from the _stated_ sender

<br> implemented by hashing the message with some shared secret key


</section>

<section markdown="block">
## Protocol Description

On a high level... once a connection is made between the client and server:

1. {:.fragment} the client starts an [SSL handshake](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_handshake):
    * {:.fragment} where information is exchanged so that the _actual_ encrypted communication can occur
    * {:.fragment} for the client... that means sending (among other things) the __highest version of TLS__ it supports
    * {:.fragment} a __list of supported cipher suites__ (what encryption algorithms do I support, what method do I use to authenticate messages, etc.)
    * {:.fragment} ...and which compression algorithms it supports
2. {:.fragment} the server responds with (among other things):
    * {:.fragment} the chosen TLS protocol version 
    * {:.fragment} which cipher suite to use
    * {:.fragment} which compression algorithm to use

</section>

<section markdown="block">
## Protocol Description Continued

So, that handles some basic setup to configure a few things (like cipher suite, compression algorithm, etc.) __Next__ &rarr;

1. {:.fragment} the server sends back an SSL cert
2. {:.fragment} once the cert is verified by the browser (was it _signed_ by a trusted certificate authority ... for example [list of trusted ca's on ios 10](https://support.apple.com/en-us/HT207177)?)
3. {:.fragment} keys can be exchanged for encryption with symmetric cryptography
    * {:.fragment} how? ...maybe through public-key / asymmetric cryptography first
    * {:.fragment} exchange public keys
    * {:.fragment} generate and exchange new keys 
    * {:.fragment} why not just use public key encryption? asymmetric is slower, requires larger keys, and resulting encrypted output is slightly larger
4. {:.fragment} client sends an encrypted message signalling that all communication will now be encrypted
5. {:.fragment} server verifies message and returns it (which is then verified by the client)

</section>

<section markdown="block">
## Resources

* [Great, succinct stackexchange article](http://security.stackexchange.com/questions/20803/how-does-ssl-tls-work)
* [Wikipedia article](https://en.wikipedia.org/wiki/Transport_Layer_Security)

</section>
