var obj = {
	findLastThree: function (id) {
    if (this.resultHash[id]) {
      var selectedResult = this.resultHash[id],
          resultList = this.patients[selectedResult.patient_id][selectedResult.name],
          i = 0;



      //search for the given result in the sorted array
      while(resultList[i] && resultList[i].result_id !== selectedResult.result_id){
        i++;
      }
      
      if (i > 3){
        //return the previous three results in order of most recent to oldest
        return resultList.splice(i-3,3).reverse();
      } else {
        //return all results before the given result if there are less than three results in front of it
        return resultList.splice(0,i).reverse();
      }
    } else {
      console.log("Given id cannot be found.")
    }
	},
	getResults: function (results) {
		var that = this;
		results.forEach(function (result){
			var result_id = result.result_id,
				patient_id = result.patient_id,
				date = result.date,
				name = result.name;

			that.resultHash[result_id] = result;

			if (that.patients[patient_id] === undefined ){

				//in the case patient_id does not exist in the patients object
				that.patients[patient_id] = {};
				//initiate a new array of the given result_name
				that.patients[patient_id][name] = [result];

			} else {

				if(that.patients[patient_id][name] === undefined){

					//in the case the given result_name does not exist with the patient
					that.patients[patient_id][name] = [result];
				} else {

					var j = 0;
					//put the result in the array sorted by time
					while(that.patients[patient_id][name][j] && Date.parse(that.patients[patient_id][name][j].date) < Date.parse(date)){
						j++;
					}
					that.patients[patient_id][name].splice(j,0,result);
				}
			}
		});
	}, 
	resultHash: {

	},
	patients: {

	}
};

/*

===== structure of resultHash object =====

e.g. 

resultHash: {
	"1": {
	    "date": "1986-09-06 01:11:25", 
	    "result_id": 1, 
	    "name": "HDL", 
	    "value": 57, 
	    "patient_id": 1000000
	},
	"2": {
	    "date": "2001-05-01 20:41:42", 
	    "result_id": 2, 
	    "name": "HDL", 
	    "value": 41, 
	    "patient_id": 1000000	
	}
}

===== structure of patients object =====

e.g.

patients: {
	"1000000": {
		"HDL": [
		  {
		    "date": "1986-03-16 01:04:45", 
		    "result_id": 3, 
		    "name": "HDL", 
		    "value": 32, 
		    "patient_id": 1000000
		  }, 
		  {
		    "date": "2000-02-28 04:06:18", 
		    "result_id": 4, 
		    "name": "HDL", 
		    "value": 13, 
		    "patient_id": 1000000
		  }
		],
		"Triglycerides": [...]
	},
	"1000008": {
		"HDL": [...],
		"Triglycerides": [...]	
	}

}

*/


