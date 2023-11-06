// TestModel.js
import mongoose from 'mongoose';

const CoursereportSchema = new mongoose.Schema({
    performance: {
        type: String,
      },
      Activity: {
        type: String,
      },
    
});

const Coursereport = mongoose.model('Coursereport', CoursereportSchema);

export default Coursereport;
