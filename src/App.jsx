import { data } from "autoprefixer";
import { useState } from "react"

export default function App() {
// track the current step
const [step, setStep] = useState(1)

// state to store form data
const [formData, setFormData] = useState({
  step1: {
    name: "",
    email: "",
    phone: "",
  },
  step2: '',
  step3: '',
  step4: '',
  step5: ''
});

  // state to store error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: ""
  })


  // validate the form inputs for the current step
  const validateStep = () => {
    if (step === 1) {
      const { name, email, phone } = formData.step1
      const newErrors = {}

      if (!name) {
        newErrors.name = "Name is required"
      }


      if (!email) {
        newErrors.email = "Email is required"
      } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        newErrors.email = "Invalid email format"
      }


      if (!phone) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\d{10}$/.test(phone)) {
        newErrors.phone = "Invalid phone format. Must be 10 digits."
      }
      setErrors(newErrors)

      if (Object.keys(newErrors).length > 0) {
        return false
      }
    }

    return true

  }

// handle the next button click
const handleNext = () => {
  // validate the current step
  if (validateStep()) {
    setStep(prevStep => prevStep + 1)
  }
}

// handle the previous button click
const handlePrevious = () => {
  setStep(prevStep => prevStep - 1)
}

// handle the form input changes
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    step1: {
      ...formData.step1,
      [name]: value
    }
  })
}


// handle the monthly and yearly toggle
const [isDurationActive, setIsDurationActive] = useState(false)

  const handleDurationChange = () => {
    setIsDurationActive(!isDurationActive)
  } 

// handle tracking of the selected plan
const [ isSelectPlan, setIsSelectPlan ] = useState(null)
  const handlePlanChange = (plan) => {
    setIsSelectPlan(plan)
  }

// handle checklist state
const [checklist, setChecklist] = useState({
  onlineService: false,
  largeStorage: false,
  customProfile: false,
})

const handleChecklistChange = (e) => {
  const { name, checked } = e.target
  setChecklist({
    ...checklist,
    [name]: checked
  })
}


// calculate the total price
const calculateTotal = () => {
  // get the plan price
  let planPrice = 0
  if (isSelectPlan === "arcade") {
    planPrice = isDurationActive ? 90 : 9
  } else if (isSelectPlan === "advanced") {
    planPrice = isDurationActive ? 120 : 12
  } else if (isSelectPlan === "pro") {
    planPrice = isDurationActive ? 150 : 15
  }

  // calculate the addon price
  let addonPrice = 0
  if (checklist.onlineService) {
    addonPrice += isDurationActive ? 12 : 1
  }
  if (checklist.largeStorage) {
    addonPrice += isDurationActive ? 24 : 2
  }
  if (checklist.customProfile) {
    addonPrice += isDurationActive ? 12 : 1
  }

  // return the total price
  return planPrice + addonPrice
}

  return (
    <main className="w-full min-h-dvh bg-magnolia flex justify-center sm:items-center font-ubuntu text-base">
      
      <div className="lg:bg-white rounded-2xl lg:p-4 lg:flex items-start gap-10 relative">

        {/* step indicator */}
        <div className="relative">
          <img 
            width={325}
            src="/images/bg-sidebar-desktop.svg"
            alt=""
            className="hidden lg:block" />

          <img 
            width={325}
            src="/images/bg-sidebar-mobile.svg"
            alt=""
            className="lg:hidden w-full absolute" />

            {/* track form steps */}
            <div className="absolute top-8 lg:left-8 left-[50%] translate-x-[-50%] lg:translate-x-0 flex gap-6 flex-row lg:flex-col">
              {[
                { step: 1, text: "STEP 1", description: "YOUR INFO"},
                { step: 2, text: "STEP 2", description: "SELECT PLAN"},
                { step: 3, text: "STEP 3", description: "ADD-ONS"},
                { step: 4, text: "STEP 4", description: "SUMMARY"}
              ].map(({step, text, description}) => (
                <div className="flex items-center lg:gap-6">
                  <div
                    key={step}
                    className={`w-10 h-10 grid place-items-center rounded-full text-base border-2 border-white font-bold ${step === step ? "text-marine-blue bg-pastel-blue" : "text-white bg-transparent"}`} >
                      {step}
                  </div>
                  
                  <div>
                    <div 
                      key={text}
                      className="text-light-gray font-normal hidden lg:block" >
                        {text}
                    </div>
                    <div 
                      key={description}
                      className="text-white font-bold hidden lg:block" >
                        {description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>


        {/* form with inputs which render based on the current step */}
        <div className="pt-[6rem] lg:p-10 lg:px-20 lg:w-2/3">
          
          <form className="relative bg-white p-6 lg:p-0 rounded-lg lg:shadow-none shadow-lg w-[90%] mx-auto">
            {step === 1 && (
              <div>
              <div>
                <h1 className="text-marine-blue lg:text-4xl text-2xl font-bold mb-2">Personal info</h1>
                <p className="text-cool-gray">Please provide your name, email address, and phone number</p>
              </div>
            
              <div className="mt-6 relative">
                <label htmlFor="nameInput" className="text-marine-blue">Name</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.step1.name}
                  onChange={handleChange}
                  placeholder="e.g. Stephen King"
                  className={`border w-full p-3 mt-2 rounded-md outline-none border-light-gray focus-visible:border-marine-blue ${errors.name? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-strawberry-red font-bold text-sm absolute top-0 right-0">{errors.name}</p>}
              </div>
            
              <div className="mt-6 relative">
                <label htmlFor="emailInput" className="text-marine-blue">Email</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.step1.email}
                  onChange={handleChange}
                  placeholder="e.g. stephenking@lorem.com"
                  className={`border w-full p-3 mt-2 rounded-md outline-none border-light-gray focus-visible:border-marine-blue ${errors.email? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-strawberry-red font-bold text-sm absolute top-0 right-0">{errors.email}</p>}
              </div>
            
              <div className="mt-6 relative">
                <label htmlFor="phoneInput" className="text-marine-blue">Phone Number</label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.step1.phone}
                  onChange={handleChange}
                  placeholder="e.g. +1 234 567 890 "
                  className={`border w-full p-3 mt-2 rounded-md outline-none border-light-gray focus-visible:border-marine-blue ${errors.phone? "border-red-500" : ""}`}
                />
                {errors.phone && <p className="text-strawberry-red font-bold text-sm absolute top-0 right-0">{errors.phone}</p>}
              </div>
            </div>
            )}

            {step === 2 && (
              <div>
                <div>
                  <h1 className="text-marine-blue lg:text-4xl text-2xl font-bold mb-2">Select Your Plan</h1>
                  <p className="text-cool-gray">You have the option of monthly or yearly billing</p>
                </div>


              {/* plans */}
                <div className="mt-10">
                  <div className="flex flex-col lg:flex-row items-center gap-4">
                    <button
                       type="button"
                       onClick={() =>  setIsSelectPlan("arcade")}
                       className={`flex items-start gap-2 lg:flex-col lg:gap w-full border-2 relative rounded-xl lg:w-[10rem] p-4 text-left ${isSelectPlan === "arcade" ? "border-2 border-purplish-blue bg-purplish-blue bg-opacity-5" : ""}`}>


                      <img src="/images/icon-arcade.svg" aria-hidden="true" />
                      <div>
                        <p className="font-bold text-xl text-marine-blue lg:mt-14">Arcade</p>
                        <p className={`text-cool-gray ${ isDurationActive ? "hidden" : "block" }`}>$9/mo</p>
                        <p className={`text-cool-gray ${ isDurationActive ? "block" : "hidden" }`}>$90/yr</p>
                        
                        <p className={`text-marine-blue ${ isDurationActive ? "block" : "hidden" }`}>2months free</p>
                      </div>
                    </button>

                    <button
                       type="button"
                       onClick={() => setIsSelectPlan("advanced")} 
                       className={`flex items-start gap-2 lg:flex-col lg:gap w-full border-2 relative rounded-xl lg:w-[10rem] p-4 text-left ${isSelectPlan === "advanced" ? "border-2 border-purplish-blue bg-purplish-blue bg-opacity-5" : ""}`}>


                      <img src="/images/icon-advanced.svg" aria-hidden="true" />
                      <div>
                        <p className="font-bold text-xl text-marine-blue lg:mt-14">Advanced</p>
                        <p className={`text-cool-gray ${ isDurationActive ? "hidden" : "block" }`}>$12/mo</p>
                        <p className={`text-cool-gray ${ isDurationActive ? "block" : "hidden" }`}>$120/yr</p>
                        
                        <p className={`text-marine-blue ${ isDurationActive ? "block" : "hidden" }`}>2months free</p>
                      </div>
                    </button>

                    <button
                       type="button"
                       onClick={() =>  setIsSelectPlan("pro")} 
                      className={`flex items-start gap-2 lg:flex-col lg:gap w-full border-2 relative rounded-xl lg:w-[10rem] p-4 text-left ${isSelectPlan === "pro" ? "border-2 border-purplish-blue bg-purplish-blue bg-opacity-5" : ""}`}>


                      <img src="/images/icon-pro.svg" aria-hidden="true" />
                      <div>
                        <p className="font-bold text-xl text-marine-blue lg:mt-14">Pro</p>
                        <p className={`text-cool-gray ${ isDurationActive ? "hidden" : "block" }`}>$15/mo</p>
                        <p className={`text-cool-gray ${ isDurationActive ? "block" : "hidden" }`}>$150/yr</p>
                        
                        <p className={`text-marine-blue ${ isDurationActive ? "block" : "hidden" }`}>2months free</p>
                      </div>
                    </button>

                    
                  </div>


                  {/* toggle button */}
                  <div className="flex items-center justify-center gap-4 rounded-md mt-8 p-2 w-full bg-magnolia text-cool-gray font-semi-bold">

                    <button type="button" onClick={handleDurationChange}>Monthly</button>
                       
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox"
                            className="sr-only"
                            checked={isDurationActive}
                            onClick={handleDurationChange} />

                            <div className={`bg-marine-blue rounded-full w-10 h-5 transition duration-300 ease-in-out ${isDurationActive ? "bg-light-blue": "" }`}></div>

                            <div className={`bg-white rounded-full w-3 h-3 transition duration-300 ease-in-out transform ${isDurationActive ? "-translate-x-[1.125rem]" : "-translate-x-[2.1275rem]"}`}></div>

                       </label>

                    <button type="button" className={`${isDurationActive ? "text-marine-blue font-bold" : "" }`} onClick={handleDurationChange}>Yearly</button>

                  </div>
                </div>
          
              </div>
            )}

            {step === 3 && (
              <div>
                <div>
                  <h1 className="text-marine-blue lg:text-4xl text-2xl font-bold mb-2">Pick add-ons</h1>
                  <p className="text-cool-gray">Add-ons help enhance your gaming experience</p>
                </div>


              {/* checklist */}
              <div className="mt-10">
                <label className="flex items-center lg:gap-6 gap-4 border-2 border-purplish-blue rounded-xl p-6 lg:w-[30rem]">

                  <input 
                    type="checkbox"
                    name="onlineService"
                    checked={checklist.onlineService}
                    onChange={handleChecklistChange}
                    className="scale-150" />

                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text text-marine-blue font-bold">Online Service</p>                        
                      <p className="text-cool-gray text-sm">Access to multiplayer games</p>                        
                    </div>

                    <span className="text-pastel-blue text-[12px] lg:text-md">+$1/mo</span>
                  </div>
                </label>

                <label className="flex items-center lg:gap-6 gap-4 border-2 border-purplish-blue rounded-xl p-6 mt-4 lg:w-[30rem]">

                  <input 
                    type="checkbox"
                    name="largeStorage"
                    checked={checklist.largeStorage}
                    onChange={handleChecklistChange}
                    className="scale-150" />

                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text text-marine-blue font-bold">Large storage</p>                        
                      <p className="text-cool-gray text-sm">Extra 1TB of cloud save</p>                        
                    </div>

                    <span className="text-pastel-blue text-[12px] lg:text-md">+$2/mo</span>
                  </div>
                </label>

                <label className="flex items-center lg:gap-6 gap-4 border-2 border-purplish-blue rounded-xl mt-4 p-6 lg:w-[30rem]">

                  <input 
                    type="checkbox"
                    name="customProfile"
                    checked={checklist.customProfile}
                    onChange={handleChecklistChange}
                    className="scale-150" />

                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text text-marine-blue font-bold">Customizable Profile</p>                        
                      <p className="text-cool-gray text-sm">Custom theme on your profile</p>                        
                    </div>

                    <span className="text-pastel-blue text-[12px] lg:text-md">+$1/mo</span>
                  </div>
                </label>


              </div>
          
              </div>
            )}

            {step === 4 && (
              <div>
                <div>
                  <h1 className="text-marine-blue lg:text-4xl text-2xl font-bold mb-2">Finishing up</h1>
                  <p className="text-cool-gray">Double check everything looks OK before confirming</p>
                </div>


                {/* summary */}
                <div className="mt-10">
                  <div className="bg-alabaster p-6 rounded-lg text-sm">
                    <div className="flex justify-between border-b-2 pb-4">
                      <p className="text-marine-blue text-xl font-bold">
                        {isSelectPlan}
                      </p>
                      <p className="text-cool-gray">
                        {isDurationActive ? `${calculateTotal()}/yr` : `${calculateTotal()}/mo`}
                      </p>
                    </div>


                    {/* display checked items */}
                    {checklist.onlineService && (
                      <div className="flex justify-between mt-4">
                        <p className="text-cool-gray">Online Service</p>
                        <p className="text-cool-gray">
                          {isDurationActive ? `+$${12}/yr` : `+$${1}/mo`}
                        </p>
                      </div>
                    )}
                    {checklist.largeStorage && (
                      <div className="flex justify-between mt-4">
                        <p className="text-cool-gray">Large Storage</p>
                        <p className="text-cool-gray">
                          {isDurationActive ? `+$${0}/yr` : `+$${2}/mo`}
                        </p>
                      </div>
                    )}
                    {checklist.customProfile && (
                      <div className="flex justify-between mt-4">
                        <p className="text-cool-gray">Custom Profile</p>
                        <p className="text-cool-gray">
                          {isDurationActive ? `+$${12}/yr` : `+$${1}/mo`}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between mt-6 text-sm">
                    <p className="text-cool-gray">Total (per {isDurationActive ? "year" : "month"})</p>
                    <p className="text-purplish-blue font-bold text-lg">
                      {isDurationActive ? `${calculateTotal()}/yr` : `+$${calculateTotal()}/mo`}
                    </p>
                  </div>
                </div>
          
              </div>
            )}

            {step === 5 && (
              <div className="lg:w-[30rem] grid items-center py-[8rem]">
                <div>
                  <img src="/images/icon-thank-you.svg" alt="" className="mx-auto" />
                  <p className="text-4xl font-bold text-marine-blue text-center mt-6">Thank you</p>
                  <p className="text-center text-cool-gray mt-4"> Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, feel free to email us at support@loremgaming.com.</p>
                </div>
              </div>
            )}



            

            {/* navigation buttons */}
            <div className="flex justify-between absolute -bottom-[20%] sm:-bottom-[35%] w-full right-0">
              {step > 1 && step < 5  && <button type="button" onClick={handlePrevious}>Go back</button>}
              {step < 4 && <button  onClick={handleNext}  
                type="button"
                className="bg-marine-blue hover:bg-purplish-blue p-2 px-6 rounded-md text-white">Next Step</button>}
              {step === 4 && <button onClick={handleNext}
                className="bg-purplish-blue p-2 px-6 rounded-md text-white">Confirm</button>}
            </div>
          </form>
        </div>
      </div>

    </main>
  )
}