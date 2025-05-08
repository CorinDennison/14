import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')

export const useStudentStore = defineStore('students', () => {

    const sortedStudents = ref([])

    const mostRecentStudent = ref( {} )

    const addNewStudentErrors = ref([])

    function getAllStudents() {
        studentAPI.get().then( students => {
            sortedStudents.value = students
        })
    }

    function addNewStudent(student) {
        studentAPI.post(student).then( () => getAllStudents())
    }

    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            getAllStudents()
        })
    }

    function arrivedOrLeft(student) {
        // Returns -1 if the student is not found
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            getAllStudents()
        })
    }

    const studentCount = computed( () => {
        return sortedStudents.value.length
    })

    return { 
        // reactive data
        mostRecentStudent,
        addNewStudentErrors,

        // functions
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft, 
        getAllStudents,

        // computed properties
        sortedStudents,
        studentCount

    }

})