--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

-- Started on 2019-04-28 14:06:01 CDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3210 (class 0 OID 17063)
-- Dependencies: 196
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: akrueger
--

COPY public.games (game_id, name) FROM stdin;
1	Puerto Rico
2	Netrunner
3	Agricola
\.


--
-- TOC entry 3212 (class 0 OID 17068)
-- Dependencies: 198
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: akrueger
--

COPY public.groups (group_id, name) FROM stdin;
1	Dads
2	MakerSquare
3	France
\.


--
-- TOC entry 3213 (class 0 OID 17071)
-- Dependencies: 199
-- Data for Name: groups_games; Type: TABLE DATA; Schema: public; Owner: akrueger
--

COPY public.groups_games (group_id, game_id) FROM stdin;
1	1
1	2
1	3
2	1
2	2
\.


--
-- TOC entry 3216 (class 0 OID 17079)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: akrueger
--

COPY public.users (user_id, username, email, first_name, last_name) FROM stdin;
1	namikuta@master-mail.net	namikuta@master-mail.net	Peter	Butterscotch
2	figuj@quickmail.rocks	figuj@quickmail.rocks	Joeseph	Waggler
\.


--
-- TOC entry 3215 (class 0 OID 17076)
-- Dependencies: 201
-- Data for Name: groups_users; Type: TABLE DATA; Schema: public; Owner: akrueger
--

COPY public.groups_users (group_id, user_id) FROM stdin;
1	1
2	1
3	1
1	2
\.


--
-- TOC entry 3217 (class 0 OID 17085)
-- Dependencies: 203
-- Data for Name: users_games; Type: TABLE DATA; Schema: public; Owner: akrueger
--

COPY public.users_games (game_id, user_id) FROM stdin;
\.


--
-- TOC entry 3224 (class 0 OID 0)
-- Dependencies: 197
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akrueger
--

SELECT pg_catalog.setval('public.games_game_id_seq', 20, true);


--
-- TOC entry 3225 (class 0 OID 0)
-- Dependencies: 200
-- Name: groups_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akrueger
--

SELECT pg_catalog.setval('public.groups_group_id_seq', 3, true);


--
-- TOC entry 3226 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akrueger
--

SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);


-- Completed on 2019-04-28 14:06:01 CDT

--
-- PostgreSQL database dump complete
--

