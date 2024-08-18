import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { FaSquarePlus } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";

// form Submit handler
const submitForm = async (formData) => {
  const response = await axios.post("/", formData);
  return response.data;
};

export default function Login() {

  const { mutate, isLoading, isError, isSuccess } = useMutation(submitForm);
  const [ageError, setAgeError] = useState("");
  const [sameAsResidential, setSameAsResidential] = useState(false);

  // form input fileds
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [ressAddress, setRessAddress] = useState({
    street1: "",
    street2: "",
  });
  const [perAddress, setPerAddress] = useState({
    street1: "",
    street2: "",
  });
  const [files, setFiles] = useState({
    file1: { name: "", type: "", file: null },
    file2: { name: "", type: "", file: null },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("ressAddress", JSON.stringify(ressAddress)); // stringify the object
    formData.append("perAddress", JSON.stringify(perAddress)); // stringify the object
    Array.from(files).forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    mutate(formData);
  };

  // Date of birth handler function
  const handleDobChange = (e) => {
    const date = new Date(e.target.value);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const month = today.getMonth() - date.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < date.getDate())) {
      age--;
    }

    setDob(e.target.value);
    if (age < 18) {
      setAgeError("You must be at least 18 years old.");
    } else {
      setAgeError("");
    }
  };

  // Residential handler function
  const handleCheckboxChange = () => {
    setSameAsResidential((prevSameAsResidential) => {
      const newValue = !prevSameAsResidential;

      if (newValue) {
        setPerAddress(ressAddress);
      }

      return newValue; // Toggle the checkbox value
    });
  };

  // File handler function
  const handleInputChange = (e, field, index) => {
    const value = e.target.value;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [`file${index}`]: { ...prevFiles[`file${index}`], [field]: value },
    }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [`file${index}`]: { ...prevFiles[`file${index}`], file },
    }));
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          XICOM MERN STACK MACHINE TEST
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-3xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name <span className="text-red-500 text-xl">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                autoComplete="given-name"
                placeholder="Enter your first name here ..."
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Last Name  */}
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name<span className="text-red-500 text-xl">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                placeholder="Enter your last name here ..."
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label
              htmlFor="e-mail"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              E-mail <span className="text-red-500 text-xl">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="e-mail"
                name="e-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="ex: myname@example.com"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Date of Birth  */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Date of Birth<span className="text-red-500 text-xl">*</span>
            </label>
            <div className="mt-2.5">
              <input
                id="dob"
                name="dob"
                value={dob}
                onChange={handleDobChange}
                type="date"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>

            {ageError ? (
              <p className="text-red-500 text-xs">{ageError}</p>
            ) : null}
          </div>

          {/* Residentail Address */}

          <div className="col-span-2 grid grid-cols-1 gap-x-8  sm:grid-cols-2">
            <h6 className="col-span-2 font-semibold">Residentail Address</h6>
            {/* Street 1 */}
            <div>
              <label
                htmlFor="residentail-address-st1"
                className="block text-sm leading-6 text-gray-600"
              >
                Steet 1<span className="text-red-500 text-xl">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="residentail-address-st1"
                  name="residentail-address-st1"
                  type="text"
                  value={ressAddress.street1}
                  onChange={(e) =>
                    setRessAddress({ ...ressAddress, street1: e.target.value })
                  }
                  autoComplete="residentail-address1"
                  placeholder="Enter your first name here ..."
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Street 2 */}
            <div>
              <label
                htmlFor="residentail-address-st2"
                className="block text-sm leading-6 text-gray-600"
              >
                Street 2<span className="text-red-500 text-xl">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="residentail-address-st2"
                  name="residentail-address-st2"
                  type="text"
                  value={ressAddress.street2}
                  onChange={(e) =>
                    setRessAddress({ ...ressAddress, street2: e.target.value })
                  }
                  autoComplete="residentail-address2"
                  placeholder="Enter your last name here ..."
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          {/* Permanent Address */}

          <div className="col-span-2 grid grid-cols-1 gap-x-8  sm:grid-cols-2">
            {/* Checkbox function  */}
            <div className="mt-2.5 col-span-2 flex items-center">
              <input
                id="address-checkbox"
                name="address-checkbox"
                checked={sameAsResidential}
                onChange={handleCheckboxChange}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 hover:cursor-pointer"
              />
              <label
                htmlFor="address-checkbox"
                className="ml-3 min-w-0 flex-1 text-gray-600 hover:cursor-pointer"
              >
                Same as Residential Address
              </label>
            </div>

            <h6 className="mt-2.5 col-span-2 font-semibold">
              Permanent Address
            </h6>

            {!sameAsResidential && (
              <>
                {/* Street 1 */}
                <div>
                  <label
                    htmlFor="permanent-address-st1"
                    className="block text-sm leading-6 text-gray-600"
                  >
                    Steet 1<span className="text-red-500 text-xl">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="permanent-address-st1"
                      name="permanent-address-st1"
                      type="text"
                      value={perAddress.street1}
                      onChange={(e) =>
                        setPerAddress({
                          ...perAddress,
                          street1: e.target.value,
                        })
                      }
                      autoComplete="permanent-address1"
                      placeholder="Enter your street 1 ..."
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* Street 2 */}
                <div>
                  <label
                    htmlFor="permanent-address-st2"
                    className="block text-sm leading-6 text-gray-600"
                  >
                    Street 2<span className="text-red-500 text-xl">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="permanent-address-st2"
                      name="permanent-address-st2"
                      type="text"
                      value={perAddress.street2}
                      onChange={(e) =>
                        setPerAddress({
                          ...perAddress,
                          street2: e.target.value,
                        })
                      }
                      autoComplete="permanent-address2"
                      placeholder="Enter your street 2 ..."
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* file Upload  */}

          <div className="col-span-2 grid grid-cols-1  gap-x-8  sm:grid-cols-4">
            <h6 className="col-span-4 font-semibold">Upload Documents</h6>

            {/* ******************** file 1 *************************** */}
            {/* File Name */}
            <div className="mt-1.5">
              <label
                htmlFor="file-name-fs1"
                className="block text-sm leading-6 text-gray-600"
              >
                File Name<span className="text-red-500 text-xl">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="file-name-fs1"
                  name="file-name-fs1"
                  type="text"
                  value={files.file1.name}
                  onChange={(e) => handleInputChange(e, "name", 1)}
                  autoComplete="given-name"
                  placeholder="Enter File Name..."
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/*Type of File*/}
            <div className="mt-1.5">
              <label
                htmlFor="file-type-fs1"
                className="block text-sm leading-6 text-gray-600"
              >
                Type of File <span className="text-red-500 text-xl">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="file-type-fs1"
                  name="file-type-fs1"
                  value={files.file1.type}
                  onChange={(e) => handleInputChange(e, "type", 1)}
                  autoComplete="file Type"
                  placeholder="Type of file"
                  className="block w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                >
                  <option value={"pdf"}>pdf</option>
                  <option value={"image"}>image</option>
                </select>
              </div>
              <p className="text-xs text-gray-400">(img,pdf.)</p>
            </div>

            {/*Upload Document*/}
            <div className="mt-1.5">
              <label
                htmlFor="file-fs1"
                className="block text-sm leading-6 text-gray-600"
              >
                Upload Document <span className="text-red-500 text-xl">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="file-fs1"
                  name="file-fs1"
                  type="file"
                  autoComplete="family-name"
                  onChange={(e) => handleFileChange(e, 1)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-start">
              <button>
                <FaSquarePlus className="text-5xl" />
              </button>
            </div>

            {/* ******************** file 2 *************************** */}
            {/* File Name */}
            <div className="mt-1.5">
              <label
                htmlFor="file-name-fs2"
                className="block text-sm leading-6 text-gray-600"
              >
                File Name<span className="text-red-500 text-xl">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="file-name-fs2"
                  name="file-name-fs2"
                  type="text"
                  value={files.file2.name}
                  onChange={(e) => handleInputChange(e, "name", 2)}
                  autoComplete="given-name"
                  placeholder="Enter File Name..."
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/*Type of File*/}
            <div className="mt-1.5">
              <label
                htmlFor="file-type-fs2"
                className="block text-sm leading-6 text-gray-600"
              >
                Type of File <span className="text-red-500 text-xl">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="country"
                  name="file-type-fs2"
                  value={files.file2.type}
                  onChange={(e) => handleInputChange(e, "type", 2)}
                  autoComplete="file-type-fs2"
                  placeholder="Type of file"
                  className="block w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                >
                  <option value={"pdf"}>pdf</option>
                  <option value={"image"}>image</option>
                </select>
              </div>
              <p className="text-xs text-gray-400">(img,pdf.)</p>
            </div>

            {/*Upload Document*/}
            <div className="mt-1.5">
              <label
                htmlFor="file-fs2"
                className="block text-sm leading-6 text-gray-600"
              >
                Upload Document <span className="text-red-500 text-xl">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="file-fs2"
                  name="file-fs2"
                  type="file"
                  onChange={(e) => handleFileChange(e, 2)}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-start">
              <button className="bg-gray-200 p-3 rounded-md">
                <IoTrashOutline className="text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit button  */}
        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="block rounded-sm bg-black px-10 py-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            {isLoading ? "Submiting..." : "Submit"}
          </button>
        </div>
        {isError && (
          <p className="text-xs text-red-500">
            There was an error submitting the form.
          </p>
        )}
        {isSuccess && (
          <p className="text-sm text-green-700">Form submitted successfully!</p>
        )}
      </form>
    </div>
  );
}
