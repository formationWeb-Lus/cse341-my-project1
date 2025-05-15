-- Créer un type ENUM pour les niveaux de cours
CREATE TYPE course_level AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- Table 1 : students
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

-- Table 2 : modules (cours)
CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    category VARCHAR(50),
    duration INTEGER, -- en heures
    price DECIMAL(10,2),
    level course_level
);

-- Table 3 : enrollments (inscriptions)
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    module_id INTEGER REFERENCES modules(id),
    enrollment_date DATE DEFAULT CURRENT_DATE
);

-- Données dans students
INSERT INTO students (name, email) VALUES
('Alice Mbala', 'alice@example.com'),
('Jean Koffi', 'jean@example.com');

-- Données dans modules
INSERT INTO modules (title, category, duration, price, level) VALUES
('Digital Marketing', 'Marketing', 10, 100.00, 'Beginner'),
('Python for Beginners', 'Programming', 15, 130.00, 'Beginner'),
('Frontend Web (HTML/CSS)', 'Web Dev', 18, 150.00, 'Intermediate'),
('Backend Web (JS/Node/MongoDB)', 'Web Dev', 20, 170.00, 'Advanced');
