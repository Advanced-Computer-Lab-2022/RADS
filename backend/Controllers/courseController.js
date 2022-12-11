const Course = require('../Models/courseModel');
const Instructor = require('../Models/instructorModel');
const mongoose = require('mongoose');

//////////////////////////////////
// GET all courses
//////////////////////////////////
const getCourses = async(req, res) => {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.status(200).json(courses);
}


//find price maximum value
const maxPrice = async(req, res) => {
    const course = await Course.find().sort({ "price": -1 }).limit(1);
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course[0].price);
}

//////////////////////////////////
// GET a single course
//////////////////////////////////
const getCourse = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findById(id)
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}


//Get a subset of courses using a subset of ids
const getCourseSubset = async(req, res) => {
    const { ids } = req.body
        //const courses = await Course.find({ '_id': "ids.courseId" });
        // const courses = await Course.find({ _id, "ids.courseId": _id });
        // const courses = await Course.find().where('_id').in(ids);
    let onlyIds = [] // declaring array to store only _ids
    for (let i = 0; i < ids.length; i++) {
        if (!onlyIds.includes(ids[i].courseId)) //checking id exist in array, if not exist push _id to onlyIds aarray
            onlyIds.push(ids[i].courseId); //push _id
    }
    const courses = await Course.find().where('_id').in(onlyIds);
    if (!courses) {
        return res.status(404).json({ error: 'No courses' });
    }
    res.status(200).json(courses);
}



//////////////////////////////////
// GET all courses taught by an instructor
//////////////////////////////////
const getCoursesByInstructor = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course that has an Instructor with the corresponding id.' });
    }
    const course = await Course.find({ instructor: id }).sort({ createdAt: -1 });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}


//////////////////////////////////
// GET a single exercise
//////////////////////////////////
const getCourseExercise = async(req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const eid = (req.params.eid);
    const course = await Course.findById({ "_id": id })
    const Exercise = course.courseExercises.find({ excerciseId: eid })
        // const Exercise = {
        //     courseExercises: {
        //         excerciseId: course.courseExercises.find(),
        //         questions: [{
        //             question: question,
        //             firstChoice: firstChoice,
        //             secondChoice: secondChoice,
        //             thirdChoice: thirdChoice,
        //             fourthChoice: fourthChoice,
        //             answer: answer
        //         }],
        //         grade: grade
        //     }
    res.status(200).json(Exercise)
}

//////////////////////////////////
// GET all exercises
//////////////////////////////////
const getCourseExercises = async(req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const course = await Course.findById({ "_id": id })
    const Exercises = course.courseExercises.find({})
    res.status(200).json(Exercises)
}

//////////////////////////////////
// POST new course
//////////////////////////////////
const postCourse = async(req, res) => {
    const { courseTitle, subtitles, price, shortSummary, subject, totalHours, instructor, courseExercises, coursePreview } = req.body;
    try {
        const course = await Course.create({
            courseTitle,
            subtitles,
            price,
            shortSummary,
            subject,
            totalHours,
            instructor,
            courseRating: 1,
            ratersCount: 1,
            courseExercises,
            coursePreview,
        });
        res.status(200).json({ message: "Course added successfully", message: "Course info" + course });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//////////////////////////////////
// DELETE a course
//////////////////////////////////
const deleteCourse = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findOneAndDelete({ _id: id });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

//////////////////////////////////
// UPDATE a course
//////////////////////////////////
const updateCourse = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

//////////////////////////////////
// POST a review to a course
//////////////////////////////////
const postCourseReview = async(req, res) => {
    const { cRating, cReview, traineeId, corpTraineeId } = req.body;
    const newReview = {
        reviews: {
            cRating: cRating,
            cReview: cReview,
            traineeId: traineeId,
            corpTraineeId: corpTraineeId
        }

    };
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const course = await Course.findById({ "_id": id })
        const currentOverallRating = course.courseRating;
        let currentRatingCount = course.ratersCount;
        const newOverallRating = (currentOverallRating * currentRatingCount + cRating) / (currentRatingCount + 1);
        currentRatingCount += 1;
        course.courseRating = newOverallRating;
        course.ratersCount = currentRatingCount;
        await course.save();
        const dbResp = await Course.findOneAndUpdate({ "_id": id }, { $push: newReview }, { new: true }).lean(true);
        if (dbResp) {
            // dbResp will be entire updated document, we're just returning newly added message which is input.
            res.status(201).json(newReview);
        } else {
            res.status(400).json({ message: 'Not able to update reviews' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//////////////////////////////////
// GET a single course's rating
//////////////////////////////////
const getCourseRating = async(req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const course = await Course.findById({ "_id": id })
    currentOverallRating = course.courseRating.rating
    res.status(200).json("Course Rating is: " + currentOverallRating)
}

//////////////////////////////////
// UPDATE a course's review
//////////////////////////////////
const updateCourseReview = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

//////////////////////////////////
// GET all course's rating
//////////////////////////////////
const getRatings = async(req, res) => {
    const ratings = await courseRating.find({}).sort({ createdAt: -1 });
    res.status(200).json(ratings);
}

//////////////////////////////////
// GET a single rating
//////////////////////////////////
const getRating = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a rating for the corresponding id.' });
    }
    const rating = await courseRating.findById(id)
    if (!rating) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(rating);
}

//////////////////////////////////
// DELETE a review
//////////////////////////////////
const deleteReview = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findOneAndDelete({ _id: id });
    if (!course) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json(course);
}

//////////////////////////////////
// UPDATE a review
//////////////////////////////////
const updateReview = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const review = await Course.findByIdAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!review) {
        return res.status(404).json({ error: 'No such course' });
    }
    res.status(200).json({ message: "Review added successfully", message: "Review info" + review });
}

const deletePromo = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist a course with the corresponding id.' });
    }
    const course = await Course.findByIdAndUpdate({ _id: id }, {
        promotionRate: 1
    });
    if (!course) {
        return res.status(404).json({ error: "no such course" });
    }
    res.status(200).json({ message: "rate updated succesfully", message: "course info" + course });
}



//Post promo
const postPromotion = async(req, res) => {
    const { promotionStartDate, promotionEndDate, promotionRate } = req.body;
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const course = await Course.findById({ "_id": id })
        course.promotionStartDate = promotionStartDate;
        course.promotionEndDate = promotionEndDate;
        course.promotionRate = promotionRate;
        await course.save();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//////////////////////////////////
// Export the functions
//////////////////////////////////
module.exports = {
    getCourses,
    getCourse,
    postCourse,
    deleteCourse,
    updateCourse,
    getCoursesByInstructor,
    postCourseReview,
    getCourseRating,
    getCourseExercise,
    getCourseExercises,
    postPromotion,
    deletePromo,
    maxPrice,
    getCourseSubset
}