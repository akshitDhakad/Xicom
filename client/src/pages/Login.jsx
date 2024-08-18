import { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";

export default function Login() {
  const [dob, setDob] = useState("");
  const [ageError, setAgeError] = useState("");
  const [sameAsResidential, setSameAsResidential] = useState(false);
  const [files, setFiles] = useState([{ name: "", type: "", file: null }]);

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
    setSameAsResidential(!sameAsResidential);
  };

  // File handler function
  const handleFileChange = (index, e) => {
    const newFiles = [...files];
    const selectedFile = e.target.files[0];

    if (
      (newFiles[index].type === "pdf" &&
        selectedFile.type !== "application/pdf") ||
      (newFiles[index].type === "image" &&
        !selectedFile.type.startsWith("image/"))
    ) {
      alert("Invalid file type!");
    } else {
      newFiles[index].file = selectedFile;
    }

    setFiles(newFiles);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();

    // Append basic form fields
    formData.append("dob", dob);
    formData.append("sameAsResidential", sameAsResidential);

    // Append files
    files.forEach((file, index) => {
      if (file.file) {
        formData.append(`file${index}`, file.file);
        formData.append(`fileName${index}`, file.name);
        formData.append(`fileType${index}`, file.type);
      }
    });

    try {
      // Send form data using axios
      const response = await axios.post("YOUR_API_ENDPOINT_HERE", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully:", response.data);
      // Handle success response here
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error response here
    }
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
                type="text"
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
                defaultValue={"option.value"}
                defaultChecked={"option.checked"}
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
                  placeholder=""
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
                  autoComplete="family-name"
                  placeholder=""
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
