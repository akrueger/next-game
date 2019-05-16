--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

-- Started on 2019-05-15 20:24:28 CDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "next-game";
--
-- TOC entry 3215 (class 1262 OID 17616)
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
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 205 (class 1255 OID 17617)
-- Name: initialize_groups(); Type: PROCEDURE; Schema: public; Owner: -
--

CREATE PROCEDURE public.initialize_groups()
    LANGUAGE sql
    AS $$SELECT * FROM GROUPS$$;


--
-- TOC entry 3216 (class 0 OID 0)
-- Dependencies: 205
-- Name: PROCEDURE initialize_groups(); Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON PROCEDURE public.initialize_groups() IS 'Return groups data by user';


SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 17618)
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    game_name character varying(500) NOT NULL
);


--
-- TOC entry 197 (class 1259 OID 17621)
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
-- TOC entry 3217 (class 0 OID 0)
-- Dependencies: 197
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- TOC entry 198 (class 1259 OID 17623)
-- Name: groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.groups (
    group_id integer NOT NULL,
    group_name character varying(150) NOT NULL
);


--
-- TOC entry 199 (class 1259 OID 17626)
-- Name: groups_games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.groups_games (
    group_id integer NOT NULL,
    game_id integer NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 17629)
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
-- TOC entry 3218 (class 0 OID 0)
-- Dependencies: 200
-- Name: groups_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.groups_group_id_seq OWNED BY public.groups.group_id;


--
-- TOC entry 201 (class 1259 OID 17631)
-- Name: groups_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.groups_users (
    group_id integer NOT NULL,
    user_id character varying(100) NOT NULL,
    role_id integer NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 17634)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    role_id smallint NOT NULL,
    role character varying(25) NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 17637)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3219 (class 0 OID 0)
-- Dependencies: 203
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 204 (class 1259 OID 17639)
-- Name: users_games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_games (
    game_id integer NOT NULL,
    user_id character varying(100) NOT NULL
);


--
-- TOC entry 3062 (class 2604 OID 17642)
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- TOC entry 3063 (class 2604 OID 17643)
-- Name: groups group_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups ALTER COLUMN group_id SET DEFAULT nextval('public.groups_group_id_seq'::regclass);


--
-- TOC entry 3064 (class 2604 OID 17644)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3066 (class 2606 OID 17646)
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- TOC entry 3072 (class 2606 OID 17648)
-- Name: groups_games groups_games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_games
    ADD CONSTRAINT groups_games_pkey PRIMARY KEY (game_id, group_id);


--
-- TOC entry 3068 (class 2606 OID 17650)
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (group_id);


--
-- TOC entry 3077 (class 2606 OID 17652)
-- Name: groups_users groups_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_users
    ADD CONSTRAINT groups_users_pkey PRIMARY KEY (group_id, user_id);


--
-- TOC entry 3079 (class 2606 OID 17654)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 3083 (class 2606 OID 17656)
-- Name: users_games users_games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_games
    ADD CONSTRAINT users_games_pkey PRIMARY KEY (game_id, user_id);


--
-- TOC entry 3069 (class 1259 OID 17657)
-- Name: fki_groups_games_game_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_groups_games_game_id_fkey ON public.groups_games USING btree (game_id);


--
-- TOC entry 3070 (class 1259 OID 17658)
-- Name: fki_groups_games_group_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_groups_games_group_id_fkey ON public.groups_games USING btree (group_id);


--
-- TOC entry 3073 (class 1259 OID 17659)
-- Name: fki_groups_users_group_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_groups_users_group_id_fkey ON public.groups_users USING btree (group_id);


--
-- TOC entry 3074 (class 1259 OID 17660)
-- Name: fki_groups_users_role_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_groups_users_role_id_fkey ON public.groups_users USING btree (role_id);


--
-- TOC entry 3075 (class 1259 OID 17661)
-- Name: fki_groups_users_user_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_groups_users_user_id_fkey ON public.groups_users USING btree (user_id);


--
-- TOC entry 3080 (class 1259 OID 17662)
-- Name: fki_users_games_game_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_users_games_game_id_fkey ON public.users_games USING btree (game_id);


--
-- TOC entry 3081 (class 1259 OID 17663)
-- Name: fki_users_games_user_id_fkey; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX fki_users_games_user_id_fkey ON public.users_games USING btree (user_id);


--
-- TOC entry 3084 (class 2606 OID 17664)
-- Name: groups_games groups_games_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_games
    ADD CONSTRAINT groups_games_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3085 (class 2606 OID 17669)
-- Name: groups_games groups_games_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_games
    ADD CONSTRAINT groups_games_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(group_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3086 (class 2606 OID 17674)
-- Name: groups_users groups_users_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_users
    ADD CONSTRAINT groups_users_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(group_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3087 (class 2606 OID 17679)
-- Name: groups_users groups_users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.groups_users
    ADD CONSTRAINT groups_users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3088 (class 2606 OID 17684)
-- Name: users_games users_games_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_games
    ADD CONSTRAINT users_games_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2019-05-15 20:24:28 CDT

--
-- PostgreSQL database dump complete
--

