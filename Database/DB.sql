-- Database: QLNS

-- DROP DATABASE IF EXISTS "QLNS";

-- CREATE DATABASE "QLNS"
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_United States.1252'
--     LC_CTYPE = 'English_United States.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;
	
-- Table: public.Account

-- DROP TABLE IF EXISTS public."Account";

CREATE TABLE IF NOT EXISTS public."Account"
(
    "idAccount" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000 MINVALUE 1000 MAXVALUE 200000 CACHE 1 ),
    "Username" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "Permission" integer NOT NULL,
    CONSTRAINT "PK_Account" PRIMARY KEY ("idAccount"),
    CONSTRAINT "U_Username" UNIQUE ("Username")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Account"
    OWNER to postgres;
	
-- Table: public.Customer

-- DROP TABLE IF EXISTS public."Customer";

CREATE TABLE IF NOT EXISTS public."Customer"
(
    "idCustomer" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 2001 MINVALUE 2000 MAXVALUE 200000 CACHE 1 ),
    "FullName" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "Address" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "PhoneNumber" character varying(15) COLLATE pg_catalog."default" NOT NULL,
    "DateOfBirth" date NOT NULL,
    "Email" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "DeptMoney" integer NOT NULL DEFAULT 0,
    CONSTRAINT "PK_Customer" PRIMARY KEY ("idCustomer")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Customer"
    OWNER to postgres;

-- Table: public.Employee

-- DROP TABLE IF EXISTS public."Employee";

CREATE TABLE IF NOT EXISTS public."Employee"
(
    "idEmployee" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 3001 MINVALUE 3000 MAXVALUE 1000000 CACHE 1 ),
    "FullName" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "PhoneNumber" character varying(15) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "Type" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "Address" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "DateOfBirth" date NOT NULL,
    "Account_idAccount" integer NOT NULL,
    CONSTRAINT "PK_Employee" PRIMARY KEY ("idEmployee"),
    CONSTRAINT "FK_Employee_Account" FOREIGN KEY ("Account_idAccount")
        REFERENCES public."Account" ("idAccount") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Employee"
    OWNER to postgres;

-- Table: public.Book

-- DROP TABLE IF EXISTS public."Book";

CREATE TABLE IF NOT EXISTS public."Book"
(
    "idBook" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 10001 MINVALUE 10000 MAXVALUE 200000 CACHE 1 ),
    "BookName" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "Author" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "Topic" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "Quantity" integer NOT NULL,
    "Price" integer NOT NULL,
    CONSTRAINT "PK_Book" PRIMARY KEY ("idBook")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Book"
    OWNER to postgres;
	
-- Table: public.Receipt

-- DROP TABLE IF EXISTS public."Receipt";

CREATE TABLE IF NOT EXISTS public."Receipt"
(
    "idReceipt" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 20000 MINVALUE 20000 MAXVALUE 200000 CACHE 1 ),
    "TotalMoney" integer NOT NULL,
    "DateCreate" date NOT NULL,
    "Customer_idCustomer" integer NOT NULL,
    "Employee_idEmployee" integer NOT NULL,
    CONSTRAINT "PK_Receipt" PRIMARY KEY ("idReceipt"),
    CONSTRAINT "FK_Receipt_Customer" FOREIGN KEY ("Customer_idCustomer")
        REFERENCES public."Customer" ("idCustomer") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_Receipt_Employee" FOREIGN KEY ("Employee_idEmployee")
        REFERENCES public."Employee" ("idEmployee") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Receipt"
    OWNER to postgres;

-- Table: public.Detail_Receipt

-- DROP TABLE IF EXISTS public."Detail_Receipt";

CREATE TABLE IF NOT EXISTS public."Detail_Receipt"
(
    "Book_idBook" integer NOT NULL,
    "Receipt_idReceipt" integer NOT NULL,
    "Quantity_Purchase" integer NOT NULL,
    CONSTRAINT "PK_Detail_Receipt" PRIMARY KEY ("Book_idBook", "Receipt_idReceipt"),
    CONSTRAINT "FK_Detail-Receipt_Book" FOREIGN KEY ("Book_idBook")
        REFERENCES public."Book" ("idBook") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_Detail-Receipt_Receipt" FOREIGN KEY ("Receipt_idReceipt")
        REFERENCES public."Receipt" ("idReceipt") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Detail_Receipt"
    OWNER to postgres;

-- Table: public.Dept_History

-- DROP TABLE IF EXISTS public."Dept_History";

CREATE TABLE IF NOT EXISTS public."Dept_History"
(
    "idDept_History" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 3000 MINVALUE 3000 MAXVALUE 300000 CACHE 1 ),
    "DateCreate" date NOT NULL,
    "Dept_Money" integer,
    "Customer_idCustomer" integer,
    CONSTRAINT "PK_Dept_History" PRIMARY KEY ("idDept_History"),
    CONSTRAINT "FK_Dept_History_Customer" FOREIGN KEY ("Customer_idCustomer")
        REFERENCES public."Customer" ("idCustomer") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Dept_History"
    OWNER to postgres;

-- Table: public.Bill

-- DROP TABLE IF EXISTS public."Bill";

CREATE TABLE IF NOT EXISTS public."Bill"
(
    "idBill" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 20000 MINVALUE 20000 MAXVALUE 200000 CACHE 1 ),
    "Money" integer NOT NULL,
    "DateCreate" date NOT NULL,
    "Customer_idCustomer" integer NOT NULL,
    CONSTRAINT "PK_Bill" PRIMARY KEY ("idBill"),
    CONSTRAINT "FK_Bill_Customer" FOREIGN KEY ("Customer_idCustomer")
        REFERENCES public."Customer" ("idCustomer") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Bill"
    OWNER to postgres;
	
-- Table: public.Regulation

-- DROP TABLE IF EXISTS public."Regulation";

CREATE TABLE IF NOT EXISTS public."Regulation"
(
    "idRegulation" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 200 CACHE 1 ),
    "Detail" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "Status" character varying(45) COLLATE pg_catalog."default",
    "Value" integer,
    CONSTRAINT "PK_Regulation" PRIMARY KEY ("idRegulation")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Regulation"
    OWNER to postgres;

-- Table: public.Import_History

-- DROP TABLE IF EXISTS public."Import_History";

CREATE TABLE IF NOT EXISTS public."Import_History"
(
    "idImport_History" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 5000 MINVALUE 5000 MAXVALUE 200000 CACHE 1 ),
    "DateCreate" date NOT NULL,
    CONSTRAINT "PK_Impory_History" PRIMARY KEY ("idImport_History")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Import_History"
    OWNER to postgres;
	
-- Table: public.Import_Detail

-- DROP TABLE IF EXISTS public."Import_Detail";

CREATE TABLE IF NOT EXISTS public."Import_Detail"
(
    "Book_idBook" integer NOT NULL,
    "Import_History_idImport_History" integer NOT NULL,
    "Quantity_Import" integer NOT NULL,
    CONSTRAINT "PK_Detail" PRIMARY KEY ("Book_idBook", "Import_History_idImport_History"),
    CONSTRAINT "FK_Detail_Book" FOREIGN KEY ("Book_idBook")
        REFERENCES public."Book" ("idBook") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_Detail_Import_History" FOREIGN KEY ("Import_History_idImport_History")
        REFERENCES public."Import_History" ("idImport_History") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Import_Detail"
    OWNER to postgres;
	
