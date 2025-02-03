import * as yup from "yup"

const passwordRules = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[\W_]))([A-Za-z\d\W_]{5,})$/;

export const basicSchema=yup.object().shape({
    email:yup.string().email("Please enter valid email").required("Required"),
    username:yup.string().min(5).required('Required'),
    password:yup.string().min(5).matches(passwordRules,{message:'Please enter a password with min 5 characters, 1 uppercase letter, 1 lowercase letter and 1 digit'}).required("Required"),
    confirmPassword:yup.string().oneOf([yup.ref('password'),null],'Passwords not matching').required('Required')
})

export const advSchema=yup.object().shape({
    email:yup.string().email("Please enter valid email").required("Required"),
    password:yup.string().min(5).matches(passwordRules,{message:'Please enter a password with min 5 characters, 1 uppercase letter, 1 lowercase letter and 1 digit'}).required("Required"),
})

export const dailyTaskSchema = yup.object().shape({
    tasktype: yup.string().min(3, 'Task type must be at least 3 characters long').required('Task type is required'),
    title: yup.string().min(3, 'Title must be at least 3 characters long').required('Title is required'),
    description: yup.string().min(10, 'Description must be at least 10 characters long').required('Description is required'),
    reminder: yup.string().matches(
        /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, 
        'Please enter a valid time in the format HH:mm'
    ).required('Reminder time is required'),
});

export const TodoSchema = yup.object().shape({
    tasktype: yup.string().min(3, 'Task type must be at least 3 characters long').required('Task type is required'),
    title: yup.string().min(3, 'Title must be at least 3 characters long').required('Title is required'),
    description: yup.string().min(10, 'Description must be at least 10 characters long').required('Description is required'),
    reminder : yup.string().required('Reminder date is required')

});

export const taskCompleteSchema= yup.object().shape({
    start_time: yup.string().matches(
        /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, 
        'Please enter a valid time in the format HH:mm'
    ).required('Start time is required'),
    completion_time: yup.string().matches(
        /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, 
        'Please enter a valid time in the format HH:mm'
    ).required('Completion time is required')
    .test('start-before-completion', 'Start time must be less than completion time', function(value) {
        const { start_time } = this.parent; 
        if (!start_time || !value) return true; 
        const [startHours, startMinutes] = start_time.split(':').map(Number);
        const [completionHours, completionMinutes] = value.split(':').map(Number);
    
        if (startHours > completionHours || (startHours === completionHours && startMinutes >= completionMinutes)) {
          return false; 
        }    
        return true; 
      })
});

export const memorySchema = yup.object().shape({
    category: yup.string().min(3, 'Category must be at least 3 characters').required('Category is required'),
    title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
    mood_score: yup.string().oneOf(['1', '2', '3', '4', '5'], 'Please select a valid mood score').required('Mood score is required'),
    note: yup.string().min(5, 'Note must be at least 5 characters').required('Note is required'),
    location: yup.string().min(3, 'Location must be at least 3 characters').required('Location is required'),
    date: yup.date().required('Date is required').max(new Date(), 'Date cannot be in the future'),
});