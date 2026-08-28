-- Q1)

CREATE TABLE customers(
	cno INT PRIMARY KEY,
	cname VARCHAR(10) NOT NULL,
	address VARCHAR(50) NOT NULL,
	email VARCHAR(20) NOT NULL,
	phone VARCHAR(20) NOT NULL
);

CREATE TABLE orders(
	orderno INT PRIMARY KEY,
	orderdate DATE DEFAULT SYSDATE() NOT NULL,
	address VARCHAR(50) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	STATUS VARCHAR(20) NOT NULL CHECK (STATUS IN ('결제완료', '배송중', '배송완료')),
	cno INT NOT NULL,
	FOREIGN KEY (cno) REFERENCES customers(cno)
);

CREATE TABLE products(
	pno INT PRIMARY KEY,
	pname VARCHAR(20) NOT NULL,
	cost INT DEFAULT '0' NOT NULL,
	stock INT DEFAULT '0' NOT NULL
);

CREATE TABLE orderdetail(
	orderno INT,
	pno INT,
	qty INT DEFAULT '0',
	cost INT DEFAULT '0',
	PRIMARY KEY (orderno, pno),
	FOREIGN KEY (orderno) REFERENCES orders(orderno),
	FOREIGN KEY (pno) REFERENCES products(pno)
);

-- Q2)

INSERT INTO products (pno, pname, cost, stock)
VALUES (1001, '삼양라면', 1000, 200),
 		 (1002, '새우깡', 1500, 500),
 		 (1003, '월드콘', 2000, 350),
 		 (1004, '빼빼로', 2000, 700),
 		 (1005, '코카콜라', 1800, 550),
 		 (1006, '환타', 1600, 300)
 		 
SELECT *
FROM products;

-- Q3)

INSERT INTO customers (cno, cname, address, email, phone)
VALUES (101, '김철수', '서울 강남구', 'cskim@naver.com', 899-6666),
 		 (102, '이영희', '부산 서면', 'yhlee@empal.com', 355-8882),
 		 (103, '최진국', '제주 동광양', 'jkchoi@gmail.com', 852-5764),
 		 (104, '강준호', '강릉 홍제동', 'jhkang@hanmail.com', 559-7777),
 		 (105, '민병국', '대전 전민동', 'bgmin@hotmail.com', 559-8741),
 		 (106, '오민수', '광주 북구', 'msoh@microsoft.com', 542-9988)
 		 
SELECT *
FROM customers;
 		 
-- Q4)

INSERT INTO orders (orderno, orderdate, address, phone, STATUS, cno)
VALUES (1, SYSDATE() - INTERVAL 3 DAY, '서울 강남구', '899-6666', '결제완료', 101);

INSERT INTO orderdetail (orderno, pno, qty, cost)
VALUES (1, 1001, 50, 1000);

SELECT o.orderno, o.orderdate, c.cname, o.address, o.phone, o.STATUS, p.pname, d.cost, d.qty
FROM orders o
JOIN orderdetail d ON(o.orderno = d.orderno)
JOIN products p ON(d.pno = p.pno)
JOIN customers c ON(o.cno = c.cno);

-- Q5)

UPDATE products P
JOIN orderdetail D USING(pno)
SET stock = P.stock-D.qty
WHERE pno = 1001
		AND
		orderno = 1;
		
SELECT *
FROM products;

-- Q6)

INSERT INTO orders (orderno, orderdate, address, phone, STATUS, cno)
VALUES (2, SYSDATE() - INTERVAL 2 DAY, '부산 수영구', '337-5000', '결제완료', 102);

INSERT INTO orderdetail (orderno, pno, qty, cost)
VALUES (2, 1002, 100, 1500);

INSERT INTO orderdetail (orderno, pno, qty, cost)
VALUES (2, 1003, 150, 2000);

SELECT o.orderno, o.orderdate, c.cname, o.address, o.phone, o.STATUS, p.pname, d.cost, d.qty
FROM orders o
JOIN orderdetail d ON(o.orderno = d.orderno)
JOIN products p ON(d.pno = p.pno)
JOIN customers c ON(o.cno = c.cno);

-- Q7)

UPDATE products P
JOIN orderdetail D USING(pno)
SET stock = P.stock-D.qty
WHERE pno = 1002
		AND
		orderno = 2;

UPDATE products P
JOIN orderdetail D USING(pno)
SET stock = P.stock-D.qty
WHERE pno = 1003
		AND
		orderno = 2;

SELECT *
FROM products;

-- Q8)

INSERT INTO orders (orderno, orderdate, address, phone, STATUS, cno)
VALUES (3, SYSDATE() - INTERVAL 1 DAY, '광주 북구', '652-2277', '결제완료', 106);

INSERT INTO orderdetail (orderno, pno, qty, cost)
VALUES (3, 1004, 100, 2000);

INSERT INTO orderdetail (orderno, pno, qty, cost)
VALUES (3, 1005, 50, 1800);

SELECT o.orderno, o.orderdate, c.cname, o.address, o.phone, o.STATUS, p.pname, d.cost, d.qty
FROM orders o
JOIN orderdetail d ON(o.orderno = d.orderno)
JOIN products p ON(d.pno = p.pno)
JOIN customers c ON(o.cno = c.cno);

-- Q9)
UPDATE products P
JOIN orderdetail D USING(pno)
SET stock = P.stock-D.qty
WHERE pno = 1004
		AND
		orderno = 3;

UPDATE products P
JOIN orderdetail D USING(pno)
SET stock = P.stock-D.qty
WHERE pno = 1005
		AND
		orderno = 3;

SELECT *
FROM products;

-- Q10)

SELECT o.orderdate, c.cname, o.address, o.phone, o.STATUS, p.pname, d.cost, d.qty, d.cost*d.qty AS 'cost*qty'
FROM orders o
JOIN orderdetail d ON(o.orderno = d.orderno)
JOIN products p ON(d.pno = p.pno)
JOIN customers c ON(o.cno = c.cno);

-- Q11)

SELECT o.orderdate, SUM(d.cost*d.qty) AS 'sum(cost*qty)'
FROM orders o
JOIN orderdetail d ON(o.orderno = d.orderno)
JOIN products p ON(d.pno = p.pno)
JOIN customers c ON(o.cno = c.cno)
GROUP BY o.orderdate;

-- Q12)

INSERT INTO products (pno, pname, cost, stock)
VALUES (1007, '목캔디', 3000, 500);

SELECT *
FROM products;

-- Q13) 

INSERT INTO orders (orderno, orderdate, address, phone, STATUS, cno)
VALUES (4, DEFAULT, '제주 동광양', '352-4657 ', '결제완료', 103);

INSERT INTO orderdetail (orderno, pno, qty, cost)
VALUES (4, 1007, 200, 3000);

UPDATE products P
JOIN orderdetail D USING(pno)
SET stock = P.stock-D.qty
WHERE pno = 1007
		AND
		orderno = 4;
		
SELECT *
FROM products;

SELECT o.orderdate, c.cname, o.address, o.phone, o.STATUS, p.pname, d.cost, d.qty, d.cost*d.qty AS 'cost*qty'
FROM orders o
JOIN orderdetail d ON(o.orderno = d.orderno)
JOIN products p ON(d.pno = p.pno)
JOIN customers c ON(o.cno = c.cno);