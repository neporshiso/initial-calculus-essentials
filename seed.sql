INSERT INTO users
    (id, username, email, password)
VALUES
    (DEFAULT, 'Zach', 'zach@zach.com', 'zach'),
    (DEFAULT, 'Daniel', 'daniel@daniel.com', 'daniel'),
    (DEFAULT, 'Nep', 'nep@nep.com', 'nep');

INSERT INTO categories
    (id, name, description)
VALUES
    (DEFAULT, 'Arithmetic and Algebraic Operations', 'algebra'),
    (DEFAULT, 'Inequalities', 'inequalities'),
    (DEFAULT, 'Trigonometric Functions', 'trigonometry'),
    (DEFAULT, 'Logarithmic and Exponential Functions', 'logarithms');

-- INSERT INTO problems
--     (id, statement, type, answer_representation, answer_value, solution, category_id)
-- VALUES
--     (DEFAULT, 'sample problem statement', 'sample problem type (truefalse, manual_ordered, manual_unordered)', 'answer representation', '{a, 1}', 'simple solution', 2);

INSERT INTO "public"."problems"("id","statement","type","answer_representation","answer_value","solution","category_id")
VALUES
(DEFAULT,E'ClRoZSBleHByZXNzaW9uClxbClxmcmFje3grMS1cZGZyYWN7MX17eCsxfX17XGRmcmFjezF9e3grMX19LApcXQpzdWNoIHRoYXQgJHhcbmVxLTEkLCBjYW4gYmUgd3JpdHRlbiBpbiB0aGUgZm9ybSAkYXheMitieCQuIEV4cHJlc3MgJGEkIGFuZCAkYiQgYXMgaW50ZWdlcnMuCg==',E'manual_ordered',E'CiRhPTEkIGFuZCAkYj0yJAo=',E'{a,1,b,2}',E'Ck9uZSBhcHByb2FjaCBpcyB0byBtdWx0aXBseSB0aGUgZ2l2ZW4gZXhwcmVzc2lvbiBieSAkXGZyYWN7eCsxfXt4KzF9JCBhdCB0aGUgb3V0c2V0OgpcYmVnaW57YWxpZ24qfQpcZnJhY3t4KzEtXGRmcmFjezF9e3grMX19e1xkZnJhY3sxfXt4KzF9fQomPSBcZnJhY3t4KzEtXGRmcmFjezF9e3grMX19e1xkZnJhY3sxfXt4KzF9fVxjZG90XGZyYWN7eCsxfXt4KzF9ICYgXHRleHR7KHN0cmF0ZWdpY2FsbHkgbXVsdGlwbHkpfVxcWzFlbV0KJj0gXGJpZ2dsKHgrMS1cZnJhY3sxfXt4KzF9XGJpZ2dyKVxjZG90KHgrMSkgJiBcdGV4dHsoc2ltcGxpZnkpfVxcWzFlbV0KJj0geCh4KzEpKzEoeCsxKS0xICYgXHRleHR7KGRpc3RyaWJ1dGUpfVxcWzFlbV0KJj0geF4yKzJ4LiAmIFx0ZXh0eyhzaW1wbGlmeSl9ClxlbmR7YWxpZ24qfQpBbm90aGVyIGFwcHJvYWNoIGlzIHRvIGZpcnN0IG9idGFpbiBhIGNvbW1vbiBkZW5vbWluYXRvciBmb3IgdGhlIGV4cHJlc3Npb24gaW4gdGhlIG51bWVyYXRvciBhbmQgdGhlbiBtdWx0aXBseSB0aHJvdWdoIGJ5ICRcZnJhY3t4KzF9e3grMX0kOgpcYmVnaW57YWxpZ24qfQpcZnJhY3t4KzEtXGRmcmFjezF9e3grMX19e1xkZnJhY3sxfXt4KzF9fQomPSBcZnJhY3tcZGZyYWN7KHgrMSleMi0xfXt4KzF9fXtcZGZyYWN7MX17eCsxfX0gJiBcdGV4dHsoY29tbW9uIGRlbm9taW5hdG9yKX1cXFsxZW1dCiY9IFxmcmFje1xkZnJhY3t4XjIrMnh9e3grMX19e1xkZnJhY3sxfXt4KzF9fSAmIFx0ZXh0eyhzaW1wbGlmeSl9XFxbMWVtXQomPSBcZnJhY3tcZGZyYWN7eF4yKzJ4fXt4KzF9fXtcZGZyYWN7MX17eCsxfX1cY2RvdFxmcmFje3grMX17eCsxfSAmIFx0ZXh0eyhzdHJhdGVnaWNhbGx5IG11bHRpcGx5KX1cXFsxZW1dCiY9IHheMisyeC4KXGVuZHthbGlnbip9CkZyb20gdGhlIGFib3ZlLCBpdCBpcyBjbGVhciB0aGF0IGJvdGggYXBwcm9hY2hlcyBhcmUgc2ltaWxhciwgYWxiZWl0IHRoZSBzZWNvbmQgYXBwcm9hY2ggc2VlbXMgdG8gYmUgYW4gYWxnZWJyYWljYWxseSBjbGVhbmVyIGFwcHJvYWNoLiBSZWdhcmRsZXNzLCBpbiB0aGUgZW5kLCAkYT0xJCBhbmQgJGI9MiQuCg==',1);

INSERT INTO "public"."problems"("id","statement","type","answer_representation","answer_value","solution","category_id")
VALUES
(DEFAULT,E'CkJ5IGNvbXBsZXRpbmcgdGhlIHNxdWFyZSwgdGhlIHBvbHlub21pYWwgJHheMi02eCs0JCBjYW4gYmUgd3JpdHRlbiBpbiB0aGUgZm9ybSAkKHgtYSleMitiJC4gRXhwcmVzcyAkYSQgYW5kICRiJCBhcyBpbnRlZ2Vycy4K',E'manual_ordered',E'CiRhPTMsIGI9LTUkCg==',E'{a,3,b,5}',E'CkNvbnNpZGVyIHRoZSBmb2xsb3dpbmc6ClxiZWdpbnthbGlnbip9CnheMi02eCs0CiY9ICh4XjItNngrOSkrNC05ICYgXHRleHR7KGFkZCBhbmQgc3VidHJhY3QgJCgtNi8yKV4yJCl9XFxbMC41ZW1dCiY9ICh4LTMpXjItNSAmIFx0ZXh0eyhmYWN0b3IpfVxcWzAuNWVtXQomPSAoeC0zKV4yKygtNSkuICYgXHRleHR7KHdyaXRlIGluIGRlc2lyZWQgZm9ybSl9ClxlbmR7YWxpZ24qfQpIZW5jZSwgJGE9MyQsIGFuZCAkYj0tNSQuCg==',1);