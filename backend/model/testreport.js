// TestModel.js
import mongoose from 'mongoose';

const testreportSchema = new mongoose.Schema({
    performance: {
        type: String,
      },
      Activity: {
        type: String,
      },
    
});

const Testreport = mongoose.model('Testreport', testreportSchema);

export default Testreport;
