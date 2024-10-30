import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useMemo } from 'react';
const departments = [
  // { id: 'pm' , name: 'PM - Oezmeral Hueseyin'  },
  // { id: 'pc' , name: 'PC - Constantinescu Monica'  },
  { id: 'mse', name: 'PC - Monica Constantinescu' },
  { id: 'tef', name: 'TEF - Radu Harceaga' },
  { id: 'qmm', name: 'QMM - Keiser Reimund' },
  { id: 'qmml', name: 'QMM-L - Sergiu Erdei' },
  { id: 'ctg', name: 'CTG - Szocs Csongor' },
  { id: 'hrl', name: 'HRL - Motoc Simina' },
  { id: 'log', name: 'LOG - Hastemir Bekir' },
  { id: 'fcm', name: 'FCM - Gyori Botond' },
  { id: 'qmmc', name: 'QMM-C - Marius Rusu' },
];

const projects = {
  pm:  ['Project #1', 'Project #2'],
  pc:  ['Project #1', 'Project #2'],
  mse: ['Project #1', 'Project #2'],
  tef: ['Project #1', 'Project #2'],
  qmm: ['Project #1', 'Project #2'],
  qmml: ['Project #1', 'Project #2'],
  ctg: ['Project #1', 'Project #2'],
  hrl: ['Project #1', 'Project #2'],
  log: ['Project #1', 'Project #2'],
  fcm: ['Project #1', 'Project #2'],
  qmmc: ['Project #1', 'Project #2']
};

const defineProjects ={

    'Project #1': 'TEF',
    'Project #2': 'MOE2',
};

const defineProjectLeader = {
    'Project #1': 'Batan Alexandru',
    'Project #2': 'Boda Mihai-Adrian',
};

const initialNotes = {
  pm: {
    'Project #1': 'Notes Project #1 PM',
    'Project #2': 'Notes Project #2 PM',
  },

  pc: {
    'Project #1': 'Notes Project #1 PC',
    'Project #2': 'Notes Project #2 PC',
  },

  mse: {
    'Project #1': 'Notes Project #1 MSE',
    'Project #2': 'Notes Project #2 MSE',
  },

  tef: {
    'Project #1': 'Notes Project #1 TEF',
    'Project #2': 'Notes Project #2 TEF',
  },

  qmm: {
    'Project #1': 'Notes Project #1 QMM',
    'Project #2': 'Notes Project #2 QMM',
  },

  qmml: {
    'Project #1': 'Notes Project #1 QMM-L',
    'Project #2': 'Notes Project #2 QMM-L',
  },

  ctg: {
    'Project #1': 'Notes Project #1 CTG',
    'Project #2': 'Notes Project #2 CTG',
  },

  hrl: {
    'Project #1': 'Notes Project #1 HRL',
    'Project #2': 'Notes Project #2 HRL',
  },

    log: {
      'Project #1': 'Notes Project #1 LOG',
      'Project #2': 'Notes Project #2 LOG',
    },
  
    fcm: {
      'Project #1': 'Notes Project #1 FCM',
      'Project #2': 'Notes Project #2 FCM',
    },
    qmmc: {
      'Project #1': 'Notes Project #1 FCM',
      'Project #2': 'Notes Project #2 FCM',
    },
  };

const departmentCriteria = {
  'pm': ["D7 and D8", "Cost reduction/Saving"],
  'pc': ["D7 and D8", "Cost reduction/Saving"],
  'mse': ["D7 and D8", "Cost reduction/Saving"],
  'tef': ["D7 and D8", "Cost reduction/Saving"],
  'qmm': ["D7 and D8", "Cost reduction/Saving"],
  'qmml': ["D7 and D8", "Cost reduction/Saving"],
  'ctg': ["D7 and D8", "Cost reduction/Saving"],
  'hrl': ["D7 and D8", "Cost reduction/Saving"],
  'log': ["D7 and D8", "Cost reduction/Saving"],
  'fcm': ["D7 and D8", "Cost reduction/Saving"],
  'qmmc': ["D7 and D8", "Cost reduction/Saving"],
};

function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [notes, setNotes] = useState(initialNotes);


  // Stare pentru rating-urile pentru fiecare categorie pentru fiecare proiect
  const [projectRatings, setProjectRatings] = useState({});
  useEffect(() => {
    // La schimbarea proiectului, verificați dacă există rating-uri pentru proiectul selectat
    if (selectedProject) {
      if (!projectRatings[selectedProject]) {
        // Dacă nu există rating-uri pentru proiectul selectat, inițializați-le cu rating-uri goale
        setProjectRatings((prevRatings) => ({
          ...prevRatings,
          [selectedProject]: {
            category1: 0,
            category2: 0,
            category3: 0,
          },
        }));
      }
    }
  }, [selectedProject, projectRatings]); // Adăugați projectRatings ca o dependență aici


  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      const savedData = localStorage.getItem('appData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setSelectedDepartment(parsedData.selectedDepartment || '');
        setSelectedProject(parsedData.selectedProject || '');
        setProjectRatings(parsedData.projectRatings || {});
        setNotes(parsedData.projectNotes || {}); // Adaugăm încărcarea notelor
      }
    };

    loadDataFromLocalStorage();
  }, []); // rulează la încărcarea componentei

  const saveToLocalStorage = () => {
    const dataToSave = {
      selectedDepartment,
      selectedProject,
      projectRatings,
      projectNotes:notes
    };
    localStorage.setItem('appData', JSON.stringify(dataToSave));
  };

  const resetAppData = () => {
    localStorage.removeItem('appData');
    setSelectedDepartment('');
    setSelectedProject('');
    setProjectRatings({});
    setNotes('');
  };


  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedProject('');
    setNotes('');
    saveToLocalStorage(); // Salvare la schimbarea proiectului
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    saveToLocalStorage(); // Salvare la schimbarea proiectului
  };

  const handleRatingChange = (project, category, rating) => {
    // Actualizați rating-urile pentru proiectul și categoria selectate
    setProjectRatings((prevRatings) => ({
      ...prevRatings,
      [project]: {
        ...prevRatings[project],
        [category]: rating,
      },
    }));
    saveToLocalStorage(); // Salvare la acordarea unui rating
  };

  const handleNotesChange = (e) => {
    const updatedNotes = { ...notes };
    if (!updatedNotes[selectedDepartment]) {
      updatedNotes[selectedDepartment] = {};
    }
    updatedNotes[selectedDepartment][selectedProject] = e.target.value;
    setNotes(updatedNotes);
    saveToLocalStorage(); // Salvare la schimbarea notelor
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Adăugăm 'projectNumber' ca al doilea parametru aici
    const calculateDataForProject = (ratings, projectNumber) => {
      const psMethodAverage = (ratings['category1'] + ratings['category2'] + ratings['category3']);
      const kpiImprovementAverage = (ratings['kpi-improvement-category1'] + ratings['kpi-improvement-category2']);
      // Obținem notele pentru proiectul curent bazat pe 'projectNumber'
      const projectNotes = notes[selectedDepartment]?.[projects[selectedDepartment][projectNumber - 1]] || '';
  
      return {
        "D7 and D8": psMethodAverage,
        "Cost reduction/Saving": kpiImprovementAverage,
        Notes: projectNotes,
      };
    };

    const getURLForProject = (sheetId, projectNumber, rowToUpdate) => {
      return `https://api.sheetbest.com/sheets/${sheetId}/tabs/Project ${projectNumber}/${rowToUpdate}`;
    }
    
    const sheetId = "3138e7a7-104e-42d2-95d3-21c7e13f8d27";
    
    const departmentIndex = departments.findIndex(dept => dept.id === selectedDepartment);
    const rowToUpdate = departmentIndex !== -1 ? departmentIndex : 0;
  
    const promises = [];
  
    for (let i = 0; i <=1; i++) {
      const currentProjectName = projects[selectedDepartment][i];
      const currentProjectRatings = projectRatings[currentProjectName];

      if (!currentProjectRatings) {
          console.warn(`Nu există ratinguri pentru Proiectul ${currentProjectName}`);
          continue;
      }
      const data = calculateDataForProject(currentProjectRatings, i + 1);
      const url = getURLForProject(sheetId, i + 1, rowToUpdate);
      promises.push(axios.patch(url, data));
    }
  
    Promise.all(promises)
      .then(responses => {
        console.log('Toate datele au fost trimise cu succes');
        setNotes('');
        setLoading(false);
        setProgress(0);
        // Afișați un mesaj către utilizator pentru succes
            alert('Data was succesfully send!Thank you!');
            // Resetați și rating-urile pentru toate proiectele

            setProjectRatings({
                'Project #1': resetRatings(),
                'Project #2': resetRatings(),
            });
            resetAppData();
        })
        .catch(error => {
            console.error('A apărut o eroare la trimiterea datelor:', error);
            if (error.response) {
                console.error('Răspuns de la server:', error.response.data);
            }
            setLoading(false);//Dezactiveaza starea de incarcare in caz de eroare
            setProgress(0); //Resetati progresul la 0
        });    
}

const resetRatings = () => {
    return {
        category1: 0,
        category2: 0,
        category3: 0,
    };
}

//<-----------------------------------------Export Data-------------------------------------------->
const renderRatings = (project, category, maxRating) => {
  const ratingsArray = Array.from({ length: maxRating }, (_, i) => i + 1);

  // Pentru a actualiza un rating specific
  const handleSingleRatingChange = (project, category, rating) => {
    // Setează ratingul pentru categoria specificată
    handleRatingChange(project, category, rating);
  };

  return (
    <div className="ratings">
      {ratingsArray.map((rating, index) => (
        <div
          key={rating}
          className={`rating-option ${
            projectRatings[project]?.[category] === rating ? 'selected' : ''
          }`}
          onClick={() => handleSingleRatingChange(selectedProject, category, rating)}
        >
          {rating}
        </div>
      ))}
    </div>
  );
};

const criteriaToSubcategories = useMemo(() => ({
  "D7 and D8": ['category1', 'category2', 'category3'],
  "Cost reduction/Saving": ['kpi-improvement-category1', 'kpi-improvement-category2'],
  }), []); // array-ul gol indică faptul că useMemo nu are dependențe și, astfel, valoarea va fi memorată și nu se va schimba între randări

const [formIsValid, setFormIsValid] = useState(false);

// Pentru inițializarea ratingurilor
useEffect(() => {
  if (selectedProject && !projectRatings[selectedProject]) {
    const relevantSubcategories = departmentCriteria[selectedDepartment].flatMap(criteria => criteriaToSubcategories[criteria] || []);
    const initialRatings = {};
    for (const subcategory of relevantSubcategories) {
      initialRatings[subcategory] = 0;
    }
    setProjectRatings((prevRatings) => ({
      ...prevRatings,
      [selectedProject]: initialRatings,
    }));
  }
}, [selectedProject, selectedDepartment, projectRatings, criteriaToSubcategories]);

// Pentru validarea formularului
useEffect(() => {
  if (!selectedDepartment || !projects[selectedDepartment]) return; // Ieșiți din efect dacă departamentul selectat nu este valid
  
  const allProjectsForDepartment = projects[selectedDepartment];
  
  const allProjectsRated = allProjectsForDepartment.every(project => {
    const ratingsForProject = projectRatings[project] || {};
    const relevantSubcategories = departmentCriteria[selectedDepartment].flatMap(criteria => criteriaToSubcategories[criteria] || []);
    return relevantSubcategories.every(subcategory => ratingsForProject[subcategory] && ratingsForProject[subcategory] !== 0);
  });
  
  setFormIsValid(allProjectsRated);
}, [projectRatings, selectedDepartment, criteriaToSubcategories]);

  return (
    <div className="App">
      {/* Afișați fereastra de încărcare și progresul doar atunci când "loading" este true */}
    {loading && (
      
      <div className="loader-container">
        <div className="loader"></div>
        <div className="progress">{progress}%</div>
      </div>
    )}
      <h1>PS Awards Digital Booklet 2024 - Finals</h1>
      <form className="dropdown" onSubmit={handleSubmit} >
      <div className='dropdown-container'>
      <div>
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="dropdown-button"
        >
          <option value="">Select department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div></div>
      <div className='dropdown-container'>
      {selectedDepartment && (
        <div className="dropdown">
          <select
            value={selectedProject}
            onChange={handleProjectChange}
            className="dropdown-button"
          >
            <option value="">Select project</option>
            {projects[selectedDepartment].map((project) => (
              <option key={project} value={project}>
                {project}
              </option>     
            ))}
          </select>
        </div>
      )}</div>
      {selectedProject && (
        <div className="form">
          <div className="form-row">
            <label>{selectedProject ? `${selectedProject}` : 'Nume:'}</label>
            <label>{defineProjects[selectedProject]}</label>
          </div>
          <div className="form-row">
            <label>Team Leader:</label>
            <label>{defineProjectLeader[selectedProject]}</label>
            <div>
            <label>Notes:</label>
            <div>
    <textarea
      id="notes"
      className="note-size"
      value={notes[selectedDepartment]?.[selectedProject] || ''}
      onChange={handleNotesChange}
      placeholder="Add your notes here..."
    /><br />
  </div></div></div>
      <div>
          <label><i>*Please select a mark for each project from below</i></label>
          <br />
        
          </div>
          {selectedDepartment && departmentCriteria[selectedDepartment].includes("D7 and D8") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">
              D7 and D8
              </label>
            </div>
            <label className="text-left">
              1. Has the final meeting taken place? (rate 0 to 5) 
            </label>
            {renderRatings(selectedProject, 'category1', 5)}
            <label className="text-left">
              2. Have preventive actions been implemented to solve the problem sustainably? (rate 0 to 5) 
            </label>
            {renderRatings(selectedProject, 'category2', 5) }
            <label className="text-left">
              3. Have the measures been documented in a lessons learned and distributed through Feber, Docupedia, and the LL-CN meeting? (rate 0 to 5) 
            </label>
            {renderRatings(selectedProject, 'category3', 5)}
          </div>)}

          {selectedDepartment && departmentCriteria[selectedDepartment].includes("Cost reduction/Saving") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">Cost reduction/Saving</label>
            </div>
            <label className="text-left">
              1. Benefit evaluation of measures converted in money 
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category1', 5)}
            <label className="text-left">
              2. Cost/benefit impact  
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category2', 5)}
          </div>)}


          <button type="submit" className="submit-button" disabled={!formIsValid}>Submit</button>
        </div>
      )}</form>
    </div>
  );
}
export default App;
