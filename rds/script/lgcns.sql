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
 