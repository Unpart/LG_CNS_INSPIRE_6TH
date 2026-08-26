-- SQL Day01
USE lgcns;

SHOW DATABASES;

DESC country;

/*
SELECT 문법( 데이터를 검색할 때 사용하는 구문)

SELECT		DISTINCT 컬럼명 | 컬럼명 | * | 표현식 및 함수 | [AS] 별칭
FROM			테이블 이름
[WHERE]		행의 제한
[GROUP BY] 	데이터를 그룹으로 묶을 때
[HAVING] 	그룹에 대한 조건
[ORDER BY] 	정렬(ASC, DESC)

별칭은 공백을 포함하는 문자 및 특수문자를 사용할 수 있으나
사용하기 위해서는 '', `` 사용해야 함.

키워드는 대소문자를 구분하지 않지만
데이터는 대소문자를 구별함
*/
SELECT * FROM job;

SELECT * FROM department;

SELECT * FROM employee;

SELECT emp_id, emp_name FROM employee;employeeemployeeemployee

-- Q) 부서번호가 90 번인 사원의 모든정보를 검색한다면?

SELECT * FROM employee WHERE dept_id = '90';

SELECT emp_name, salary, (salary + (salary * bonus_pct)) * 12 AS '연봉' FROM employee;

-- NULL 처리함수 : IFNULL(NULL, 'xxxxx'), NULLIF(100,'xxxxx');

SELECT IFNULL(NULL, '포세이도느이 아들 외눈박이 돌연변이'),NULLIF(100,0);

SELECT emp_name, salary, (salary + (salary * IFNULL(bonus_pct, 0))) * 12 AS '연봉' FROM employee;

-- DISTINCT : 컬럼에 포함된 중복 값을 한 번씩만 출력
SELECT DISTINCT dept_id FROM employee;

-- WHERE
-- 연산자(비교(LIKE, NOT LIKE), 산술, 논리(AND, OR, NOT))


-- Q) 부서번호가 90번이면서 급여가 4000000 이상인 사원의 모든정보를 검색한다면?
SELECT * FROM employee WHERE dept_id = '90' AND salary >= 4000000;

-- CONCAT() : 연결연산자
SELECT CONCAT('임정섭', '강사님은', '점심을', '먹엇을까?');

SELECT CONCAT(emp_name, '님의 급여는', salary, '(원)입니다.') AS '급여정보' FROM employee;

-- Q) 급여가 3500000이상 ~ 5500000이하인 사원의 이름, 급여, 직급을 검색한다면?
SELECT emp_name, salary, job_id FROM employee WHERE salary >= 3500000 AND salary <= 5500000;

SELECT emp_name, salary, job_id FROM employee WHERE salary BETWEEN 3500000 AND 5500000;

/*
LIKE, NOT LIKE : 패턴 검색(%,_)연산자
% : 하나이상의 문자와 매핑
_ : 하나의 문자와 매핑
*/
-- Q) 김씨 성을 가진 사원의 모든 정보를 검색한다면

SELECT * FROM employee WHERE emp_name LIKE '김%';

SELECT * FROM employee WHERE emp_name NOT LIKE '김%';

-- Q) 메일아이디 중 _ 앞자리가 3자리인 사람의 정보를 검색한다면?

SELECT * FROM employee WHERE email LIKE '___\_%';

-- Q) 부서배치를 받지않은 사원의 정보를 검색한다면?

SELECT * FROM employee WHERE dept_id IS NULL;

SELECT * FROM employee WHERE dept_id IS NOT NULL;

-- Q) 부서번호가 60번이가너 90번인 사원의 정보를 검색한다면?

SELECT * FROM employee WHERE dept_id = '60' OR dept_id = '90';

SELECT * FROM employee WHERE dept_id IN (60, 90);


-- workbook(basic) : 문제풀이
-- Q1)
SELECT DEPARTMENT_NAME AS '학과 명', CATEGORY AS '계열' FROM TB_DEPARTMENT;

-- Q2)
SELECT CONCAT(DEPARTMENT_NAME,'의 정원은 ',CAPACITY,'명 입니다.') AS '학과별 정원'  FROM TB_DEPARTMENT;

-- Q3)
SELECT STUDENT_NAME FROM TB_STUDENT WHERE DEPARTMENT_NO = '001' AND ABSENCE_YN = 'Y' AND STUDENT_SSN LIKE '%-2%';

-- Q4)
SELECT STUDENT_NAME FROM TB_STUDENT WHERE STUDENT_NO IN ('A513079', 'A513090', 'A513091', 'A513110', 'A513119');

-- Q5)
SELECT DEPARTMENT_NAME, CATEGORY FROM tb_department WHERE CAPACITY BETWEEN	20 AND 30;

-- Q6)
SELECT PROFESSOR_NAME FROM tb_professor WHERE DEPARTMENT_NO IS NULL;

-- Q7)
SELECT * FROM tb_student WHERE DEPARTMENT_NO IS NULL;

-- Q8)
SELECT CLASS_NO FROM tb_class WHERE PREATTENDING_CLASS_NO IS NOT NULL;

-- Q9)
SELECT DISTINCT CATEGORY FROM tb_department;

-- Q10)
SELECT STUDENT_NO, STUDENT_NAME, STUDENT_SSN FROM TB_STUDENT WHERE ENTRANCE_DATE LIKE '2002-%' AND STUDENT_ADDRESS LIKE '%전주%' AND ABSENCE_YN = 'N';











-- SQL Day02(함수)
/*
함수?
- 하나의 큰 프로그램에서 반복적으로 사용되는 부분들을 분리한 작은 서브프로그램
- 호출하고 반환
- 유형
	- 단일행 함수 (문자, 날짜, 숫자, 기타변환 함수)
	- 복수행 함수(그룹) : min, max, sum, count, avg, etc...(window function)
- 정렬
- 서브그룹(group by, having)
*/
 
SELECT *
FROM employee;
 
 -- 컬럼의 타입 : 문자, 날짜, 숫자
 -- 문자열 함수 : 
 -- LENGTH, CONCAT, SUBSTRING, LEFT, RIGHT, INSTR, REPLACE, UPPER, LOWER, TRIM, PAD, ...
SELECT LENGTH('입정섭'), LENGTH('jslim'), CHAR_LENGTH('임정섭');

SELECT emp_name, LENGTH(emp_name)
FROM employee;

SELECT UPPER('lgcns'), LOWER('LGCNS');

SELECT TRIM('    TRIM    '), LENGTH(TRIM('    TRIM    '));
SELECT LTRIM('    TRIM    '), LENGTH(LTRIM('    TRIM    '));
SELECT RTRIM('    TRIM    '), LENGTH(RTRIM('    TRIM    '));

-- 문자열을 채우는 함수 : LPAD, RPAD
SELECT LPAD('5', 3,' '), LENGTH(LPAD('5', 3,' '));
SELECT RPAD('5', 3,' '), LENGTH(RPAD('5', 3,' '));

SELECT email, LENGTH(email), LPAD(email, 20, '#')
FROM employee;
 
SELECT CHAR(65), CONCAT('임정섭','님');
 
 -- SUBSTRING : 부분문자열을 반환하는 함수 (LEFT, RIGHT)
 
SELECT SUBSTRING('ABCDEF', 1, 2), LEFT('ABCDEF', 2), RIGHT('ABCDEF', 2);

SELECT SUBSTRING('THIS IS INSPITR CAMP' FROM 9 FOR 7),
		 SUBSTRING('THIS IS INSPITR CAMP', 9, 7),
		 SUBSTRING_INDEX('WWW.LGCNS.COM', '.', -1);
		 
-- INSTR : 문자열을 이용해서 부분문자열의 인덱스를 반환
SELECT INSTR('LGCNS CAMP', 'CAMP');

-- Q) . 앞의 문자 'c' 인덱스 번지를 검색
-- Q) 메일 아이디만 추출
-- hint) 함수는 함수를 중첩할 수 있음

SELECT INSTR(email, 'c.')
FROM employee;

SELECT SUBSTRING(email, 1, INSTR(email, '@')-1)
FROM employee;

-- 문자열 반복
SELECT repeat('LGCNS',3),
		 REPLACE('');

SELECT LEFT(hire_date, 4)
FROM employee;

SELECT CONCAT(LEFT(emp_no, 8),'******')
FROM employee;

-- CASTING : CAST(TYPE AS TYPE)
SELECT SUBSTRING(EMP_NO, 1, 6),
		 SUBSTRING(EMP_NO, 8, 7),
		 CAST(SUBSTRING(EMP_NO, 1, 6) AS INT) + CAST(SUBSTRING(EMP_NO, 8, 7) AS INT)
FROM EMPLOYEE;

USE SQLDB;

SELECT *
FROM usertbl;

SELECT *
FROM buytbl;

-- 고객의 평균 구매 개수룰 검색한다면?
SELECT AVG(AMOUNT)
FROM buytbl;

SELECT CAST(AVG(AMOUNT) AS INT)
FROM buytbl;

SELECT CAST(AVG(AMOUNT) AS SIGNED INTEGER)
FROM buytbl;

-- Q) 구매번호, 총 금액(PRICE * AMOUNT = ), 구매액(PRICE * AMOUNT)을 검색한다면?
-- CAST() 함수 활용
SELECT NUM AS '구매번호', 
		 CONCAT( CAST(PRICE AS VARCHAR(10)), ' * ', CAST(AMOUNT AS VARCHAR(10)), ' = ')  AS `총 금액`, 
		 PRICE * AMOUNT AS '구매액'
FROM buytbl;

-- 숫자함수
SELECT ABS(-100),
		 CEILING(4.7),
		 CEILING(4.1),
		 FLOOR(4.7),
		 FLOOR(4.1),
		 ROUND(4153.415354, 2),
		 ROUND(4153.415354, -2),
		 TRUNCATE(4153.415354, 2),
		 TRUNCATE(4153.415354, -2),
		 GREATEST(10, 20, 100, 30),
		 LEAST(10, 20, 100, 30);
		 
-- 날짜함수
SELECT NOW(),
		 SYSDATE(),
		 CURDATE(),
		 CURTIME(),
		 ADDDATE(CURDATE(), INTERVAL 30 YEAR),
		 ADDDATE(CURDATE(), INTERVAL 2 MONTH),
		 ADDDATE(CURDATE(), INTERVAL 2 DAY),
		 SUBDATE(NOW(), INTERVAL 30 DAY),
		 SUBTIME(NOW(), '13:00:00')
		 ;
		 
-- 날짜타입 컬럼에 연산?
SELECT HIRE_DATE,
		 ADDDATE(HIRE_DATE + 1 AS DATE)
FROM employee;

-- Q) 입사일을 기준으로 근속년수가 30년이 되는 일자를 검색한다면?
SELECT HIRE_DATE,
		 ADDDATE(HIRE_DATE, INTERVAL 30 YEAR)
FROM employee;

-- Q) 오늘 날짜를 기준으로 근속년수가 30년이상인 사원의 모든 정보를 검색한다면?
-- HINT) 
SELECT DATEDIFF(CURDATE(), '2026-01-01');

SELECT * 
FROM employee
WHERE DATEDIFF(CURDATE(), HIRE_DATE)/365 >= 30;


-- D DEFINITION L
DROP TABLE COUPON_TBL;
CREATE TABLE COUPON_TBL(
	CREATE_AT DATE,
	END_AT DATE
);

SELECT *
FROM COUPON_TBL;

-- DML
INSERT INTO COUPON_TBL(CREATE_AT, END_AT)
VALUE(NOW(), ADDDATE(NOW(), INTERVAL 7 DAY));

SELECT HIRE_DATE,
		 SUBSTRING(HIRE_DATE, 1, 4),
		 CAST(YEAR(HIRE_DATE) AS CHAR),
		 CAST(MONTH(HIRE_DATE) AS CHAR),
		 CAST(DAY(HIRE_DATE) AS CHAR),
		 CAST(HOUR(HIRE_DATE) AS CHAR),
		 CAST(MINUTE(HIRE_DATE) AS CHAR),
		 CAST(SECOND(HIRE_DATE) AS CHAR)
FROM employee;

-- 날짜의 요일을 숫자로 반환
-- WEEKDAY() : 0 월요일 ~ 6 일요일
-- DAYOFWEEK() : 1 일요일 ~ 7 토요일

SELECT WEEKDAY(NOW()), DAYOFWEEK(NOW());

-- 기타함수
-- 흐름제어함수(IF, IFNULL, NULLIF, CASE ~ WHEN ~ THEN ~ END)
SELECT IF(100 > 200, 'TRUE', 'FALSE');
SELECT CASE 10
			WHEN 1 THEN '1'
			WHEN 2 THEN '2'
			ELSE '없음'
		END '구분';
		
SELECT *
FROM employee;

-- 성별?
-- Q) 부서번호가 50번인 사원의 이름, 주민번호, 성별 검색한다면?
SELECT EMP_NAME, EMP_NO, IF(SUBSTRING(EMP_NO, 8, 1) IN('1','3'), '남자', '여자') AS '성별'
FROM employee
WHERE DEPT_ID = '50';

SELECT EMP_NAME, EMP_NO,
		 IF(SUBSTRING(EMP_NO, 8, 1) IN('1','3'), '남자', '여자') AS 'GENDER',
		 CASE SUBSTRING(EMP_NO, 8, 1)
		 	WHEN '1'	THEN '남자'
			WHEN '2' THEN '여자'
		 	WHEN '3'	THEN '남자'
			WHEN '4' THEN '여자'
			ELSE '?'
		 END AS 'GENDER',
		 CASE  
		 	WHEN SUBSTRING(EMP_NO, 8, 1) IN('1','3') THEN '남자'
			WHEN SUBSTRING(EMP_NO, 8, 1) IN('2','4') THEN '여자'
			ELSE '?'
		 END AS 'GENDER'
FROM employee
WHERE DEPT_ID = '50';

-- Q) 사원테이블에서 직급(JOB_ID) 이 'J4' 사원의 이름, 사번, 사수번호(MGR_ID) 검색한다면?
-- 조건) 사수번호가 없는 사원 MGR_ID 컬럼에 '관리자' 출력
SELECT EMP_NAME, EMP_ID, IF(MGR_ID = '', '관리자', MGR_ID) AS 'MGR_ID'
FROM employee
WHERE JOB_ID = 'J4';

-- Q) 급여등급을 나눠보고 싶다
-- 300 이하면 초급, 400 이하면 중급, 초과하면 고급
-- 사원번호, 이름, 급여, 급여등급 검색한다면?

SELECT  EMP_ID AS '사원번호', EMP_NAME AS '이름', SALARY AS '급여', 
		  CASE
			  	WHEN SALARY <= 3000000 THEN '초급'
			  	WHEN SALARY <= 4000000 THEN '중급'
			  	ELSE '고급'
			END AS '급여등급'
FROM employee;

-- Q) 남자사원에 대한 정보만 출력
SELECT  EMP_NAME AS '이름', EMP_NO AS '주민번호', '남자' AS '성별'
FROM employee
WHERE SUBSTRING(EMP_NO, 8, 1) = '1';


-- 복수행 함수 (GROUP BY ~)
-- 여러행의 결과를 입력으로해서 하나 또는 그 이상의 결과를 반환
-- WHERE 절에는 복수행 함수 x 
-- SELECT 절에서는 사용가능하나, 일반컬럼은 사용할 수 없음.

-- Q) 사원수를 확인하고 싶다면?
SELECT COUNT(*),
		 COUNT(BONUS_PCT),
		 COUNT(IFNULL(BONUS_PCT, 0)),
		 MIN(SALARY),
		 MAX(SALARY),
		 AVG(SALARY),
		 SUM(SALARY)
FROM employee;


-- ORDER BY [기준컬럼 | 표현식 | 컬럼인덱스 | 컬럼 별칭] ASC | DESC
SELECT  EMP_ID AS '사원번호', EMP_NAME AS '이름', SALARY AS '급여', 
		  CASE
			  	WHEN SALARY <= 3000000 THEN '초급'
			  	WHEN SALARY <= 4000000 THEN '중급'
			  	ELSE '고급'
			END AS '급여등급'
FROM employee
ORDER BY SALARY DESC;


-- WORKSHOP

-- Q1)
SELECT STUDENT_NO AS '학번', STUDENT_NAME AS '이름', ENTRANCE_DATE AS '입학년도'
FROM tb_student
WHERE DEPARTMENT_NO = '002'
ORDER BY ENTRANCE_DATE ASC;

-- Q2)
SELECT PROFESSOR_NAME, PROFESSOR_SSN
FROM tb_professor
WHERE CHAR_LENGTH(PROFESSOR_NAME) != 3;

-- Q3)
SELECT PROFESSOR_NAME AS '교수이름', 
	CAST(
    	DATEDIFF(
        NOW(),
        CAST(CONCAT('19', SUBSTRING(PROFESSOR_SSN, 1, 6)) AS DATE)
    	) / 365 AS INT
	) AS '나이'
FROM tb_professor
WHERE SUBSTRING(PROFESSOR_SSN, 8, 1) = '1'
ORDER BY 나이 ASC;

-- Q4)
SELECT SUBSTRING(PROFESSOR_NAME, 2) AS '이름'
FROM tb_professor;

-- Q5)
SELECT STUDENT_NO, STUDENT_NAME
FROM TB_STUDENT
WHERE CAST( 
			DATEDIFF(
            NOW(),
            CAST(
                IF(
                    CAST(SUBSTRING(STUDENT_SSN, 1, 2) AS INT) >= 50,
                    CONCAT('19', SUBSTRING(STUDENT_SSN, 1, 6)),
                    CONCAT('20', SUBSTRING(STUDENT_SSN, 1, 6))
                )
                AS DATE
            )
        ) / 365
        AS INT
      ) != 19;
      
-- Q6)
SELECT CASE DAYOFWEEK('2020-12-25')
			WHEN 1 THEN '일요일'
			WHEN 2 THEN '월요일'
			WHEN 3 THEN '화요일'
			WHEN 4 THEN '수요일'
			WHEN 5 THEN '목요일'
			WHEN 6 THEN '금요일'
			ELSE '토요일' 
		END AS '요일';

-- Q8)
SELECT STUDENT_NO, STUDENT_NAME
FROM tb_student
WHERE SUBSTRING(STUDENT_NO, 1, 1) != 'A';

-- Q9)
SELECT ROUND(AVG(POINT), 1) AS '평점'
FROM tb_grade
WHERE STUDENT_NO = 'A517178';

-- Q11)
SELECT COUNT(*)
FROM tb_student
WHERE COACH_PROFESSOR_NO IS NULL;





-- SQL DAY03(GROUP BY, HAVING, JOIN)

-- GROUP BY - 특정 컬럼에 대해 동일한 값을 가지는 행들을 하나의 행으로 처리(통계)
-- GROUP BY {COLUMN | EXPR | POSITION}
-- GROUP BY 절에 명세된 컬럼과 집계함수만 SELECT 절에 정의할 수 있다.

SELECT *
FROM employee;

SELECT MIN(SALARY)
FROM employee;

-- 그룹함수는 일반적으로 GROUP BY 같이 사용되는 경우가 흔함.
-- Q) 부서별 급여 총합을 검색하다면?

SELECT DEPT_ID, SUM(SALARY)
FROM employee
WHERE SALARY >= 3000000
GROUP BY DEPT_ID
HAVING SUM(SALARY) >= 4000000;

SELECT EMP_NAME, DEPT_ID, MAX(SALARY)
FROM employee
GROUP BY DEPT_ID

-- Q) 급여등급별 인원수 집계하고 싶다면?

SELECT	SALARY AS S ,
			CASE 	WHEN
						SALARY <= 3000000 THEN '초급'
					WHEN
						SALARY <= 4000000 THEN '중급'
					ELSE '고급'
			END AS `GRADE`,
			COUNT(*) AS 'COUNT'
FROM		employee 
GROUP BY GRADE
-- ORDER BY COUNT DESC;
ORDER BY FIELD(GRADE, '중급', '초급', '고급')

USE SQLDB;
SELECT *
FROM USERTBL;
SELECT *
FROM BUYTBL;

-- Q) 사용자별 구매총액을 검색한다면?
SELECT USERID, SUM(PRICE * AMOUNT)
FROM buytbl
GROUP BY USERID;

-- Q) 사용자별 평균 구매 개수를 검색한다면?
SELECT USERID, ROUND(AVG(AMOUNT))
FROM buytbl
GROUP BY USERID;


-- Q) 부서번호가 50번이거나 부서가 없는 사원의 이름, 급여를 출력하되
-- 조건) 급여가 많은 사원부터 조회
SELECT EMP_NAME, EMP_NO, SALARY
FROM employee
WHERE DEPT_ID = '50' OR DEPT_ID IS NULL
ORDER BY SALARY DESC;

-- Q) 위 결과를 바탕으로 성별에 따른 평균 급여를 검색한다면?

SELECT CASE 
			WHEN SUBSTRING(EMP_NO, 8, 1) IN ('1','3') THEN '남자'
			WHEN SUBSTRING(EMP_NO, 8, 1) IN ('2','4') THEN '여자'
		 END AS 'GENDER',
		 ROUND(AVG(SALARY)) AS AVG_SALARY
FROM employee
WHERE DEPT_ID = '50' OR DEPT_ID IS NULL
GROUP BY GENDER
ORDER BY AVG_SALARY DESC;

-- Q) 부서별 급여 총액이 9000000 이상인 부서만 검색한다면?
SELECT DEPT_ID,
		 SUM(SALARY)
FROM employee
GROUP BY DEPT_ID
HAVING SUM(SALARY) >= 9000000;

-- Q) 사용자별 총 구매액이 100 이상인 사용자들만 검색한다면?
SELECT USERID, SUM(PRICE * AMOUNT)
FROM buytbl
GROUP BY USERID
HAVING SUM(PRICE * AMOUNT) >= 100
ORDER BY 2 DESC;

-- 계층적 즙계 결과 WITH ROLLUP

-- Q) 구매한 목록 중 그룹이름별 구매비용을 검색한다면?
SELECT GROUPNAME, SUM(PRICE * AMOUNT) AS 'NUM'
FROM buytbl
GROUP BY GROUPNAME, NUM WITH ROLLUP;

/*
WINDOW FUNCTION(분석함수) : 기존 행을 유지하면서 집계결과를 열 추가
GROUP FUNCTION(AVG, RANK, ROW_NUMBER, DENSE_RANK) ~ OVER(PARTITION BY | ORDER BY)
*/

USE LGCNS;

SELECT EMP_NAME, SALARY, DEPT_ID, AVG(SALARY) OVER(PARTITION BY DEPT_ID) AS 'DAVG'
FROM employee;

-- 사원의 급여 순위를 검색하고 싶다면?
SELECT EMP_NAME, SALARY, RANK() OVER(ORDER BY SALARY DESC) AS 'RANK'
FROM employee;

SELECT EMP_NAME, SALARY, DENSE_RANK() OVER(ORDER BY SALARY DESC) AS 'RANK'
FROM employee;

SELECT EMP_NAME, SALARY, ROW_NUMBER() OVER(ORDER BY SALARY DESC) AS 'RANK'
FROM employee;

-- Q) 부서별 급여 순위 검색한다면?(부서마다 따로 순위를 정하고 싶다면)
SELECT EMP_NAME, DEPT_ID, 
		 RANK() OVER(PARTITION BY DEPT_ID ORDER BY SALARY DESC) AS 'RANK'
FROM employee;

-- 스킵 문항 : 10, 12, 13, 14, 15
-- ADDITIONAL SELECTION - 함수

-- Q10) 
SELECT DEPARTMENT_NO AS '학과번호',
       COUNT(STUDENT_NO) AS '학생수(명)'
FROM tb_student
GROUP BY DEPARTMENT_NO;

-- Q12) 
SELECT	SUBSTRING(TERM_NO, 1, 4) AS '년도',
			ROUND(AVG(CAST(POINT AS DECIMAL(10, 2))), 1)	AS '년도 별 평점'
FROM		tb_grade
WHERE		STUDENT_NO = 'A112113'
GROUP BY 1
ORDER BY 1;

-- Q13) 
SELECT DEPARTMENT_NO AS '학과코드명',
		 SUM(ABSENCE_YN = 'Y') AS '휴학생 수'
FROM tb_student	
GROUP BY DEPARTMENT_NO;

-- Q14) 
SELECT A.STUDENT_NAME AS '동일이름',
       COUNT(A.STUDENT_NAME) AS '동명인 수'
FROM tb_student A, tb_student B
WHERE A.STUDENT_NO != B.STUDENT_NO AND A.STUDENT_NAME = B.STUDENT_NAME
GROUP BY 1
ORDER BY 1;

-- Q15)
SELECT SUBSTRING(TERM_NO, 1, 4) AS '년도' , 
		 SUBSTRING(TERM_NO, 5, 2) AS '학기', 
		 ROUND(AVG(CAST(POINT AS DECIMAL (10, 2))), 1) AS '평점'
FROM tb_grade
WHERE STUDENT_NO = 'A112113'
GROUP BY 년도, 학기 WITH ROLLUP;	


/*
JOIN
- N개 이상인 테이블을 서로 묶어서(가상의 테이블) 하나의 결과 집합을 만들어 내는 것
- 관계형 데이터베이스의 가장 큰 특징
- 관계(1:1, 1:N, N:M)

ANSI 표준구문
SELECT
FROM 	  TABLE
[INNER] JOIN	TABLE ON (조건식)
[INNER] JOIN	TABLE USING (컬럼명)

NATURAL [INNER] JOIN TABLE;

LEFT | RIGHT [OUTER] JOIN TABLE;
*/
SELECT E.EMP_NAME,
		 D.DEPT_NAME
FROM employee E, department D
WHERE E.DEPT_ID = D.DEPT_ID;

SELECT E.EMP_NAME,
		 D.DEPT_NAME
FROM employee E 
JOIN department D
	ON(E.DEPT_ID = D.DEPT_ID);
	
SELECT E.EMP_NAME,
		 D.DEPT_NAME
FROM employee E 
JOIN department D
	USING(DEPT_ID);

-- CROSS JOIN(의미없음)
SELECT E.EMP_NAME,
		 D.DEPT_NAME
FROM employee E 
JOIN department D;
	
SELECT EMP_NAME,
		 JOB_TITLE,
		 DEPT_NAME
FROM job J
JOIN employee E USING(JOB_ID)
JOIN department D USING(DEPT_ID);

SELECT EMP_NAME,
		 JOB_TITLE,
		 DEPT_NAME
FROM job J
JOIN employee E ON(J.JOB_ID = E.JOB_ID)
JOIN department D ON(E.DEPT_ID = D.DEPT_ID);

SELECT EMP_NAME,
		 JOB_TITLE,
		 DEPT_NAME,
		 LOC_DESCRIBE
FROM job J
JOIN employee E ON(J.JOB_ID = E.JOB_ID)
JOIN department D ON(E.DEPT_ID = D.DEPT_ID)
JOIN location L ON(D.LOC_ID = L.LOCATION_ID);
	
SELECT EMP_NAME,
		 JOB_TITLE,
		 DEPT_NAME,
		 LOC_DESCRIBE,
		 COUNTRY_NAME
FROM job J
JOIN employee E ON(J.JOB_ID = E.JOB_ID)
JOIN department D ON(E.DEPT_ID = D.DEPT_ID)
JOIN location L ON(D.LOC_ID = L.LOCATION_ID)
JOIN country C ON(L.COUNTRY_ID = C.COUNTRY_ID)
WHERE DEPT_NAME LIKE '해외%'
		AND
		LOC_DESCRIBE LIKE '아시아%';

USE SQLDB
SELECT *
FROM USERTBL;
SELECT *
FROM BUYTBL;

-- Q) 사용자의 아이디가 JYP인 유저의 이름과 구매상품을 검색한다면?
SELECT U.name, B.prodName
FROM usertbl U
JOIN buytbl B ON(B.userID = U.userID)
WHERE U.userID = 'JYP';

-- Q) 사용자의 아이디, 이름, 구매상품, 주소, 연락처(MOBILE1 + MOBILE2)를 검색한다면?
SELECT U.userID, U.name, B.prodName, U.addr, CONCAT(U.mobile1, U.mobile2) AS '연락처'
FROM usertbl U
JOIN buytbl B USING(userID);

-- Q) 위 요구사항에서 구매이력이 있는 회원만 검색한다면?
SELECT U.userID, U.name, B.prodName, U.addr, CONCAT(U.mobile1, U.mobile2) AS '연락처'
FROM usertbl U
JOIN buytbl B USING(userID);

SELECT U.userID, U.name, B.prodName, U.addr, CONCAT(U.mobile1, U.mobile2) AS '연락처'
FROM usertbl U
LEFT JOIN buytbl B USING(userID);

SELECT U.userID, U.name, U.addr, CONCAT(U.mobile1, U.mobile2) AS '연락처'
FROM usertbl U
WHERE EXISTS (
					SELECT *
					FROM buytbl B
					WHERE U.userID = B.userID
				 );


-- OUTER JOIN				 
SELECT E.EMP_NAME, D.DEPT_NAME
FROM EMPLOYEE E
LEFT JOIN DEPARTMENT D USING(DEPT_ID);

SELECT E.EMP_NAME, D.DEPT_NAME
FROM EMPLOYEE E
RIGHT JOIN DEPARTMENT D USING(DEPT_ID);

-- Q) 부서배치를 받지않은 사원의 이름, 부서명을 검색한다면?
SELECT E.EMP_NAME, D.DEPT_NAME
FROM EMPLOYEE E
LEFT JOIN DEPARTMENT D ON(E.DEPT_ID = D.DEPT_ID)
WHERE DEPT_NAME IS NULL;

-- Q) 사원이름과 사수의 이름을 검색한다면?
SELECT *
FROM employee;

SELECT E.EMP_NAME, M.EMP_NAME
FROM employee E
JOIN employee M ON(E.MGR_ID = M.MGR_ID);

SELECT E.EMP_NAME, M.EMP_NAME
FROM employee E
LEFT JOIN employee M ON(E.MGR_ID = M.MGR_ID);

SELECT E.EMP_NAME, M.EMP_NAME, S.EMP_NAME
FROM employee E
LEFT JOIN employee M ON(E.MGR_ID = M.MGR_ID)
LEFT JOIN employee S ON(M.MGR_ID = S.MGR_ID);



-- ADDITIONAL SELECT - OPTION 실습(1 ~ 14)

-- Q1) 
SELECT STUDENT_NAME AS '학생 이름',
		 STUDENT_ADDRESS AS '주소지'
FROM tb_student
ORDER BY STUDENT_NAME;

-- Q2)
SELECT STUDENT_NAME, STUDENT_SSN
FROM tb_student
WHERE ABSENCE_YN = 'Y'
ORDER BY STUDENT_SSN;

-- Q3)
SELECT STUDENT_NAME AS '학생 이름',
		 STUDENT_NO AS '학번',
		 STUDENT_ADDRESS AS '거주지 주소'
FROM tb_student
WHERE STUDENT_NO NOT LIKE 'A%' 
		AND 
		(
			STUDENT_ADDRESS LIKE '강원도%' 
			OR 
			STUDENT_ADDRESS LIKE '경기도%' 
		)
ORDER BY STUDENT_NAME;

-- Q4)
SELECT P.PROFESSOR_NAME, P.PROFESSOR_SSN
FROM tb_professor P, tb_department D
WHERE P.DEPARTMENT_NO = D.DEPARTMENT_NO
		AND
		D.DEPARTMENT_NAME = '법학과'
ORDER BY PROFESSOR_SSN;

-- Q5)
SELECT STUDENT_NO, POINT
FROM tb_grade
WHERE TERM_NO = '200402'
		AND
		CLASS_NO = 'C3118100'
ORDER BY POINT DESC;

-- Q6) 
SELECT S.STUDENT_NO, S.STUDENT_NAME, D.DEPARTMENT_NAME
FROM tb_student S, tb_department D
WHERE S.DEPARTMENT_NO = D.DEPARTMENT_NO
ORDER BY S.STUDENT_NAME;
		
-- Q7) 
SELECT C.CLASS_NAME, D.DEPARTMENT_NAME
FROM tb_class C, tb_department D
WHERE C.DEPARTMENT_NO = D.DEPARTMENT_NO;

-- Q8)
SELECT C.CLASS_NAME, P.PROFESSOR_NAME
FROM tb_class C, tb_professor P, tb_class_professor F
WHERE C.CLASS_NO = F.CLASS_NO
		AND
		P.PROFESSOR_NO = F.PROFESSOR_NO;
		
-- Q9)
SELECT C.CLASS_NAME, P.PROFESSOR_NAME
FROM tb_class C, tb_professor P, tb_class_professor F, tb_department D
WHERE C.CLASS_NO = F.CLASS_NO
		AND
		P.PROFESSOR_NO = F.PROFESSOR_NO
		AND
		C.DEPARTMENT_NO = D.DEPARTMENT_NO
		AND
		D.CATEGORY = '인문사회';
		
-- Q10)
SELECT S.STUDENT_NO AS '학번', 
		 S.STUDENT_NAME AS '학생 이름', 
		 ROUND(AVG(CAST(G.POINT AS DECIMAL(10, 2))), 1) AS '전체 평점'
FROM tb_student S, tb_grade G, tb_department D
WHERE S.STUDENT_NO = G.STUDENT_NO
		AND 
		S.DEPARTMENT_NO = D.DEPARTMENT_NO
		AND
		D.DEPARTMENT_NAME = '음악학과'
GROUP BY 1;

-- Q11)
SELECT D.DEPARTMENT_NAME AS '학과이름', S.STUDENT_NAME AS '학생이름', P.PROFESSOR_NAME AS '지도교수이름'
FROM tb_student S, tb_department D, tb_professor P
WHERE S.DEPARTMENT_NO = D.DEPARTMENT_NO
		AND
		S.COACH_PROFESSOR_NO = P.PROFESSOR_NO
		AND
		S.STUDENT_NO = 'A313047';
		
-- Q12)
SELECT S.STUDENT_NAME, G.TERM_NO AS 'TERM_NAME'
FROM tb_student S, tb_grade G, tb_class C
WHERE S.STUDENT_NO = G.STUDENT_NO
		AND
		G.CLASS_NO = C.CLASS_NO
		AND
		G.TERM_NO LIKE '2007%'
		AND
		C.CLASS_NAME = '인간관계론';
				
-- Q13)
SELECT C.CLASS_NAME, D.DEPARTMENT_NAME
FROM tb_class C
	  LEFT JOIN 
	  tb_class_professor F
	  ON C.CLASS_NO = F.CLASS_NO,
	  tb_department D
WHERE C.DEPARTMENT_NO = D.DEPARTMENT_NO
		AND
		D.CATEGORY = '예체능'
		AND
		F.PROFESSOR_NO IS NULL;
		
-- Q14)
SELECT S.STUDENT_NAME AS '학생이름', IFNULL(P.PROFESSOR_NAME, '지도교수 미지정') AS '지도교수'
FROM tb_student S
	  LEFT JOIN
	  tb_professor P
	  ON S.COACH_PROFESSOR_NO = P.PROFESSOR_NO
	  , tb_department D
WHERE 
		S.DEPARTMENT_NO = D.DEPARTMENT_NO
		AND
		D.DEPARTMENT_NAME = '서반아어학과'