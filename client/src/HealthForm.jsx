import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';


function HealthForm() {
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Other');
  const [needsSpecialAssistance, setNeedsSpecialAssistance] = useState(false);
  const [walkFrequency, setWalkFrequency] = useState(''); 
  const [walkDistance, setWalkDistance] = useState(''); 
  const [sportsPracticed, setSportsPracticed] = useState([]); 
  const [sportsFrequency, setSportsFrequency] = useState({}); 
  const [sportsIntensity, setSportsIntensity] = useState({}); 

  ///--///
  const handleSaveHealthData = async () => {
    console.log('Saving health data...');
    let activityIndex = 0;
  
    // punctele pentru mers pe jos
    if (walkFrequency && walkDistance) {
      const walkPoints = parseInt(walkFrequency) * parseInt(walkDistance);
      activityIndex += walkPoints * 2;
    }
  
    // punctele pentru sport
    sportsPracticed.forEach(sport => {
      const frequencyPoints = {
        'Less than once a week': 1,
        '1-2': 3,
        '3-5': 5,
        '6-7': 7
      };
      const intensityPoints = {
        'Low': 1,
        'Medium': 3,
        'High': 5
      };
      const sportFrequency = sportsFrequency[sport];
      const sportIntensity = sportsIntensity[sport];
      if (sportFrequency && sportIntensity) {
        // punctele pe activitate
        let pointsForSport = 2;
        
        if (sport !== 'swimming' && sport !== 'something else' &&  sport !== 'running' &&  sport !== 'going to gym' ) {
          pointsForSport = 3;
        }
        const frequencyValue = frequencyPoints[sportFrequency];
        const intensityValue = intensityPoints[sportIntensity];
        activityIndex += pointsForSport * frequencyValue * intensityValue;
      }
    });
  
    activityIndex = Math.min(activityIndex, 100);
  
    console.log('Activity Index:', activityIndex);
  
    try {
      const response = await fetch('http://localhost:3000/api/saveHealthData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          birthDate,
          height,
          weight,
          gender,
          needsSpecialAssistance,
          walkFrequency,
          walkDistance,
          sportsPracticed,
          sportsFrequency,
          sportsIntensity,
          activityIndex
        })
      });
      
      if (response.ok) {
        console.log('Health data saved successfully.');
      } else {
        console.error('Failed to save health data.');
      }
    } catch (error) {
      console.error('Error while saving health data:', error);
    }
  };
  //----///
  const handleSportSelection = (sport) => {
    if (sportsPracticed.includes(sport)) {
      const updatedSports = sportsPracticed.filter(item => item !== sport);
      setSportsPracticed(updatedSports);
    } else {
      setSportsPracticed([...sportsPracticed, sport]);
      setSportsFrequency({...sportsFrequency, [sport]: ''});
      setSportsIntensity({...sportsIntensity, [sport]: ''});
    }
  };

  return (
    <div className="health-form-container" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', margin: '20px', fontFamily: 'Arial, sans-serif', color: '#000' }}> 
      <div className="info-item">
        <InputLabel className="input-label" style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#09005f75' }}>Birth Date:</InputLabel>
        <TextField
          className="health-data-input"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div className="info-item">
        <InputLabel className="input-label" style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#09005f75' }}>Height (cm):</InputLabel>
        <TextField
          className="health-data-input"
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="info-item">
        <InputLabel className="input-label" style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#09005f75' }}>Weight (kg):</InputLabel>
        <TextField
          className="health-data-input"
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="info-item">
        <InputLabel className="input-label" style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#09005f75' }}>Gender:</InputLabel>
        <Select
          className="health-data-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </div>
      <div className="info-item">
        <InputLabel className='input-laber' style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#09005f75' }}>Needs Special Assistance:</InputLabel>
        <FormControlLabel
          control={<Checkbox checked={needsSpecialAssistance} onChange={(e) => setNeedsSpecialAssistance(e.target.checked)} />}
        />
      </div>
      <div className="info-item">
        <InputLabel className="input-label" style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#09005f75' }}>How often do you walk?</InputLabel>
        <Select
          className="health-data-input"
          value={walkFrequency}
          onChange={(e) => setWalkFrequency(e.target.value)}
        >
          <MenuItem value="">Select frequency</MenuItem>
          <MenuItem value="1">1 day a week</MenuItem>
          <MenuItem value="2">2 days a week</MenuItem>
          <MenuItem value="3">3 days a week</MenuItem>
          <MenuItem value="4">4 days a week</MenuItem>
          <MenuItem value="5">5 days a week</MenuItem>
          <MenuItem value="6">6 days a week</MenuItem>
          <MenuItem value="7">7 days a week</MenuItem>
        </Select>
      </div>
      <div className="info-item">
        <InputLabel className="input-label" style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#09005f75' }}>The average distance of the walk (km):</InputLabel>
        <TextField
          className="health-data-input"
          type="text"
          value={walkDistance}
          onChange={(e) => setWalkDistance(e.target.value)}
        />
      </div>

      <div className="info-item">
        <InputLabel className="input-label" style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: '#09005f75' }}>Do you practice any sports?</InputLabel>
        <div className="sports-container">
          {['running', 'football', 'basketball', 'tennis', 'volleyball', 'handball', 'swimming', 'going to the gym', 'something else'].map((sport) => (
            <div key={sport} className="sport-item">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={sportsPracticed.includes(sport)} onChange={() => handleSportSelection(sport)} />}
                  label={sport}
                />
                {sportsPracticed.includes(sport) && (
                  <>
                    <InputLabel className="input-label">Frequency:</InputLabel>
                    <Select
                      className="health-data-input"
                      value={sportsFrequency[sport]}
                      onChange={(e) => setSportsFrequency({...sportsFrequency, [sport]: e.target.value})}
                    >
                      <MenuItem value="">Select frequency</MenuItem>
                      <MenuItem value="Less than once a week">Less than once a week</MenuItem>
                      <MenuItem value="1-2">1-2 times a week</MenuItem>
                      <MenuItem value="3-5">3-5 times a week</MenuItem>
                      <MenuItem value="6-7">6-7 times a week</MenuItem>
                    </Select>
                    <InputLabel className="input-label">Intensity:</InputLabel>
                    <Select
                      className="health-data-input"
                      value={sportsIntensity[sport]}
                      onChange={(e) => setSportsIntensity({...sportsIntensity, [sport]: e.target.value})}
                    >
                      <MenuItem value="">Select intensity</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="health-data-buttons">
        <Button variant="outlined" className="save-btn" onClick={handleSaveHealthData}>Save</Button>
      </div>
    </div>
  );
}

export default HealthForm;
