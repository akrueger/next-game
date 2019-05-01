--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

-- Started on 2019-05-01 11:50:17 CDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "next-game";
--
-- TOC entry 3203 (class 1262 OID 17338)
-- Name: next-game; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "next-game" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect -reuse-previous=on "dbname='next-game'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 17339)
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    game_id smallint NOT NULL,
    game_name character varying(500) NOT NULL
);


--
-- TOC entry 197 (class 1259 OID 17342)
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.games_game_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3204 (class 0 OID 0)
-- Dependencies: 197
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- TOC entry 198 (class 1259 OID 17344)
-- Name: groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.groups (
    group_id smallint NOT NULL,
    group_name character varying(150) NOT NULL
);


--
-- TOC entry 199 (class 1259 OID 17347)
-- Name: groups_games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.groups_games (
    group_id smallint NOT NULL,
    game_id smallint NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 17350)
-- Name: groups_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.groups_group_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3205 (class 0 OID 0)
-- Dependencies: 200
-- Name: groups_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.groups_group_id_seq OWNED BY public.groups.group_id;


--
-- TOC entry 201 (class 1259 OID 17352)
-- Name: groups_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.groups_users (
    group_id smallint NOT NULL,
    user_id character varying(100) NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 17361)
-- Name: users_games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_games (
    game_id smallint NOT NULL,
    user_id character varying(100) NOT NULL
);


--
-- TOC entry 3055 (class 2604 OID 17364)
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- TOC entry 3056 (class 2604 OID 17365)
-- Name: groups group_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups ALTER COLUMN group_id SET DEFAULT nextval('public.groups_group_id_seq'::regclass);


--
-- TOC entry 3058 (class 2606 OID 17367)
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- TOC entry 3064 (class 2606 OID 17369)
-- Name: groups_games groups_games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_games
    ADD CONSTRAINT groups_games_pkey PRIMARY KEY (game_id, group_id);


--
-- TOC entry 3060 (class 2606 OID 17371)
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (group_id);


--
-- TOC entry 3068 (class 2606 OID 17373)
-- Name: groups_users groups_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_users
    ADD CONSTRAINT groups_users_pkey PRIMARY KEY (group_id, user_id);


--
-- TOC entry 3072 (class 2606 OID 17375)
-- Name: users_games users_games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_games
    ADD CONSTRAINT users_games_pkey PRIMARY KEY (game_id, user_id);


--
-- TOC entry 3061 (class 1259 OID 17378)
-- Name: fki_groups_games_game_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_groups_games_game_id_fkey ON public.groups_games USING btree (game_id);


--
-- TOC entry 3062 (class 1259 OID 17379)
-- Name: fki_groups_games_group_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_groups_games_group_id_fkey ON public.groups_games USING btree (group_id);


--
-- TOC entry 3065 (class 1259 OID 17380)
-- Name: fki_groups_users_group_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_groups_users_group_id_fkey ON public.groups_users USING btree (group_id);


--
-- TOC entry 3066 (class 1259 OID 17381)
-- Name: fki_groups_users_user_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_groups_users_user_id_fkey ON public.groups_users USING btree (user_id);


--
-- TOC entry 3069 (class 1259 OID 17382)
-- Name: fki_users_games_game_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_users_games_game_id_fkey ON public.users_games USING btree (game_id);


--
-- TOC entry 3070 (class 1259 OID 17383)
-- Name: fki_users_games_user_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_users_games_user_id_fkey ON public.users_games USING btree (user_id);


--
-- TOC entry 3073 (class 2606 OID 17384)
-- Name: groups_games groups_games_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_games
    ADD CONSTRAINT groups_games_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3074 (class 2606 OID 17389)
-- Name: groups_games groups_games_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_games
    ADD CONSTRAINT groups_games_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(group_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3075 (class 2606 OID 17394)
-- Name: groups_users groups_users_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_users
    ADD CONSTRAINT groups_users_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(group_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3076 (class 2606 OID 17404)
-- Name: users_games users_games_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_games
    ADD CONSTRAINT users_games_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2019-05-01 11:50:17 CDT

--
-- PostgreSQL database dump complete
--

