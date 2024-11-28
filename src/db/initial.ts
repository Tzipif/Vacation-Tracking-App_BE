import runQuery from "./dal"

const createDB = async () => {
    let q = "CREATE DATABASE IF NOT EXISTS `follow-vacations-app`";
    await runQuery(q);
}

const createTables = async () => {
    let q = `CREATE TABLE IF NOT EXISTS user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(40) NOT NULL,
        last_name VARCHAR(40) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(225) NOT NULL,
        role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
        token VARCHAR(1000)
    )`;

    await runQuery(q);

    q = `CREATE TABLE IF NOT EXISTS vocation (
        id INT PRIMARY KEY AUTO_INCREMENT,
        destination VARCHAR(225) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        start_vocation DATE NOT NULL,
        end_vocation DATE NOT NULL,
        price DECIMAL(10, 2),
        url_image VARCHAR(1000)
    )`;

    await runQuery(q);

    q = `CREATE TABLE IF NOT EXISTS following (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        vocation_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY (vocation_id) REFERENCES vocation(id) ON DELETE CASCADE
    )`;

    await runQuery(q);
};

const createSampleData = async () => {
    // let q = `INSERT INTO user (first_name, last_name, email, password, role) VALUES
    //         ('John', 'Doe', 'john.doe@example.com', 'password123', 'user'),
    //         ('Jane', 'Smith', 'jane.smith@example.com', 'password456', 'admin'),
    //         ('Alice', 'Brown', 'alice.brown@example.com', 'password789', 'user');`;

    // runQuery(q);

    let q = `INSERT INTO vocation (destination, description, start_vocation, end_vocation, price, url_image) VALUES
            ('Tokyo', 'Experience the vibrant culture and delicious cuisine of Tokyo.', '2024-10-15', '2024-10-30', 3000.00, 'modern-exterior-urban-view.jpg'),
            ('Barcelona', 'Enjoy the stunning architecture and beaches of Barcelona.', '2024-09-15', '2024-09-25', 2100.00, 'view-park-guell-winter-barcelona.jpg'),
            ('New York', 'Explore the iconic landmarks of New York City.', '2024-11-01', '2024-11-10', 2800.00, 'aerial-shot-beautiful-cityscape-brazil.jpg'),
            ('Rome', 'Discover the rich history and art of Rome.', '2024-11-20', '2024-11-30', 2300.00, 'ancient-ruins-roman-forum-foro-romano-sunsrise-rome-italy-view-from-capitoline-hill.jpg');`;

    await runQuery(q);

    // q = `INSERT INTO following (user_id, vocation_id) VALUES
    // (1, 1), 
    // (1, 2), 
    // (2, 3),
    // (3, 4);`;

    // runQuery(q);
}

const deleteTables = async () => {
    let q = `DROP TABLE IF EXISTS vocation_image`;
    await runQuery(q);

    q = `DROP TABLE IF EXISTS following`;
    await runQuery(q);

    q = `DROP TABLE IF EXISTS vocation`;
    await runQuery(q);

    q = `DROP TABLE IF EXISTS user`;
    await runQuery(q);
};

const deleteUrlLine = async () => {
    let q = `ALTER TABLE vocation
             DROP COLUMN url_image;`;

    runQuery(q)
}

const changeTheWord = async () => {
    let q = `ALTER TABLE user MODIFY token VARCHAR(1000); `

    await runQuery(q);
    return
    q = `ALTER TABLE user CHANGE passward password VARCHAR(225) NOT NULL;`

    await runQuery(q);
}


// createDB().then(()=>{
//     console.log('DB created successfully');
// })

// createTables().then(()=>{
//     console.log('Tables created successfully');
// })

// deleteTables().then(()=>{
//     console.log('Tables deleteed successfully');
// })

// createSampleData().then(()=>{
//     console.log('SampleData created successfully');
// });

// changeTheWord().then(()=>{
//     console.log('The word changed');
// });