// Khởi tạo lớp SinhVien
class SinhVien {
    constructor(id, name, gender, dob, hometown) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

// Lớp quản lý sinh viên
class QuanLySinhVien {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
        this.loadTable();
    }

    addStudent(student) {
        this.students.push(student);
        this.saveData();
        this.loadTable();
    }

    updateStudent(updatedStudent) {
        const index = this.students.findIndex(sv => sv.id === updatedStudent.id);
        if (index !== -1) {
            this.students[index] = updatedStudent;
            this.saveData();
            this.loadTable();
        }
    }

    deleteStudent(id) {
        this.students = this.students.filter(sv => sv.id !== id);
        this.saveData();
        this.loadTable();
    }

    saveData() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    loadTable() {
        const tbody = document.querySelector("#studentTable tbody");
        tbody.innerHTML = '';

        this.students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td class="actions">
                    <button class="edit" onclick="editStudent('${student.id}')">Sửa</button>
                    <button class="delete" onclick="deleteStudent('${student.id}')">Xóa</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Khởi tạo đối tượng quản lý sinh viên
const qlsv = new QuanLySinhVien();

document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('studentId').value || new Date().getTime().toString();
    const name = document.getElementById('studentName').value;
    const gender = document.getElementById('studentGender').value;
    const dob = document.getElementById('studentDOB').value;
    const hometown = document.getElementById('studentHometown').value;

    const student = new SinhVien(id, name, gender, dob, hometown);

    if (document.getElementById('studentId').value) {
        qlsv.updateStudent(student);
    } else {
        qlsv.addStudent(student);
    }

    this.reset();
});

function editStudent(id) {
    const student = qlsv.students.find(sv => sv.id === id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentGender').value = student.gender;
        document.getElementById('studentDOB').value = student.dob;
        document.getElementById('studentHometown').value = student.hometown;
    }
}

function deleteStudent(id) {
    if (confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
        qlsv.deleteStudent(id);
    }
}
