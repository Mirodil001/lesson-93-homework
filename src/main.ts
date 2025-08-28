const users = document.querySelector(".users") as HTMLDivElement;
const loading = document.createElement("p") as HTMLParagraphElement;
type addAndEdit = "edit" | "add";

loading.classList =
  "flex items-center justify-center text-[44px] mt-[200px] font-bold  ";
loading.textContent = "Loading ...";

users.appendChild(loading);

async function getUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log("Foydalanuvchi:", data);
    return data;
  } catch (error) {
    console.error("Xatolik:", error);
  }
}

const newusers: any[] = [];

getUser().then((userss) => {
  for (let item1 of userss) {
    const obj: any = {};
    for (let item2 in item1) {
      const key = item2;
      switch (key) {
        case "name":
          obj[key] = (item1 as any)[key];
          break;
        case "email":
          obj[key] = (item1 as any)[key];
          break;
        case "website":
          obj[key] = (item1 as any)[key];
          break;
        case "address":
          obj[key] = (item1 as any)[key].street;
          break;
        case "company":
          obj[key] = (item1 as any)[key].name;
          break;
      }
    }
    newusers.push(obj);
  }

  function createUsers() {
    const allUsers = document.createElement("div") as HTMLDivElement;
    const addBtn = document.createElement("button") as HTMLButtonElement;
    const menuList = document.createElement("div") as HTMLDivElement;
    const menuN = document.createElement("div");
    const menuE = document.createElement("div");
    const menuW = document.createElement("div");
    const menuA = document.createElement("div");
    const menuC = document.createElement("div");
    const menuB = document.createElement("div");

    allUsers.classList = "flex flex-col items-end justify-end";
    addBtn.classList =
      "w-[40px] px-8 py-4 bg-blue-700 flex items-center justify-center";
    menuList.classList = "flex items-center justify-start bg-gray-100";
    menuN.classList =
      "flex items-center justify-start p-4 border border-[#A9A9A9] w-[200px] text-[14px]";
    menuE.classList =
      "flex items-center justify-start p-4 border border-[#A9A9A9] w-[240px] text-[14px]";
    menuW.classList =
      "flex items-center justify-start p-4 border border-[#A9A9A9] w-[200px] text-[14px]";
    menuA.classList =
      "flex items-center justify-start p-4 border border-[#A9A9A9] w-[200px] text-[14px]";
    menuC.classList =
      "flex items-center justify-start p-4 border border-[#A9A9A9] w-[200px] text-[14px]";
    menuB.classList =
      "flex items-center justify-start p-4 border border-[#A9A9A9] w-[200px] text-[14px]";

    addBtn.textContent = "Add";
    menuN.textContent = "Name";
    menuE.textContent = "Email";
    menuW.textContent = "Website";
    menuA.textContent = "Address";
    menuC.textContent = "Company";
    menuB.textContent = "Action";

    menuList.append(menuN, menuE, menuA, menuW, menuC, menuB);
    allUsers.appendChild(addBtn);
    allUsers.append(menuList);

    for (let i = 0; i < newusers.length; i++) {
      let divUsers = document.createElement("div") as HTMLDivElement;
      let divBtns = document.createElement("div") as HTMLDivElement;
      let divEdit = document.createElement("button") as HTMLButtonElement;
      let divDelete = document.createElement("button") as HTMLButtonElement;

      divEdit.textContent = "E";
      divDelete.textContent = "D";

      divBtns.classList =
        "flex p-2 gap-5 items-center justify-center border border-[#A9A9A9] w-[200px]";
      divUsers.classList = "flex items-center justify-start";
      divEdit.classList =
        "p-2 border-hidden w-[40px] bg-yellow-500 text-[14px]";
      divDelete.classList =
        "p-2 border-hidden  w-[40px] bg-red-800 text-[14px]";

      divBtns.append(divEdit, divDelete);

      for (let item2 in newusers[i]) {
        const key = item2;
        let divuser = document.createElement("div") as HTMLDivElement;
        if (key !== "email") {
          divuser.classList =
            "flex items-center justify-start p-4 border border-[#A9A9A9] w-[200px] text-[14px]";
        } else {
          divuser.classList =
            "flex items-center justify-start p-4 border border-[#A9A9A9] w-[240px] text-[14px]";
        }

        divuser.textContent = newusers[i][key];
        divUsers.append(divuser);
      }
      divUsers.appendChild(divBtns);
      allUsers.appendChild(divUsers);
      divEdit.onclick = () => createModal("edit");
      divDelete.onclick = () => {
        newusers.splice(i, 1);
        createUsers();
      };

      addBtn.onclick = () => {
        createModal("add");
      };

      function createModal(type: addAndEdit) {
        // Overlay (fonni qoraytiruvchi div)
        const overlay = document.createElement("div");
        overlay.className =
          "fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50";
        overlay.id = "customModal";

        // Modal oynasi
        const modal = document.createElement("div");
        modal.className =
          "relative bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 text-white";

        // Sarlavha
        const title = document.createElement("h3");
        title.className = "text-lg font-semibold mb-2";
        title.textContent = "User list";

        //Inputs
        const inputs = document.createElement("div") as HTMLDivElement;
        const inputName = document.createElement("input") as HTMLInputElement;
        const inputEmail = document.createElement("input") as HTMLInputElement;
        const inputWebsite = document.createElement(
          "input"
        ) as HTMLInputElement;
        const inputAddress = document.createElement(
          "input"
        ) as HTMLInputElement;
        const inputCompany = document.createElement(
          "input"
        ) as HTMLInputElement;

        inputName.placeholder = "Name";
        inputEmail.placeholder = "Email";
        inputWebsite.placeholder = "Website";
        inputAddress.placeholder = "Address";
        inputCompany.placeholder = "Company";

        inputName.classList = "border border-white rounded-[15px] p-2 m-2";
        inputEmail.classList = "border border-white rounded-[15px] p-2 m-2";
        inputWebsite.classList = "border border-white rounded-[15px] p-2 m-2";
        inputAddress.classList = "border border-white rounded-[15px] p-2 m-2";
        inputCompany.classList = "border border-white rounded-[15px] p-2 m-2";

        if (type === "edit") {
          inputName.value = newusers[i].name;
          inputEmail.value = newusers[i].email;
          inputWebsite.value = newusers[i].website;
          inputAddress.value = newusers[i].address;
          inputCompany.value = newusers[i].company;
        } else if (type === "add") {
          // inputName.value = "";
          // inputEmail.value = "";
          // inputWebsite.value = "";
          // inputAddress.value = "";
          // inputCompany.value = "";
        }

        inputs.append(
          inputName,
          inputEmail,
          inputWebsite,
          inputAddress,
          inputCompany
        );

        // Tugmalar
        const btnWrapper = document.createElement("div");
        btnWrapper.className = "flex justify-end gap-2 mt-4";

        const deactivateBtn = document.createElement("button");
        deactivateBtn.textContent = "Deactivate";
        deactivateBtn.className =
          "bg-red-500 hover:bg-red-400 text-white font-semibold px-3 py-2 rounded-md";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.className =
          "bg-white/10 hover:bg-white/20 inset-ring inset-ring-white/5 text-white font-semibold px-3 py-2 rounded-md";

        // Yopish eventlari
        cancelBtn.onclick = () => document.body.removeChild(overlay);
        deactivateBtn.onclick = () => {
          if (
            inputName.value === "" ||
            inputEmail.value === "" ||
            inputWebsite.value === "" ||
            inputAddress.value === "" ||
            inputCompany.value === ""
          ) {
            alert("Inputga hechnarsa kiritmagansiz !!!");
          } else {
            if (type === "edit") {
              for (let item2 in newusers[i]) {
                const key = item2;
                switch (key) {
                  case "name":
                    newusers[i][key] = inputName.value;
                    break;
                  // console.log("N",divName);
                  case "email":
                    newusers[i][key] = inputEmail.value;
                    break;
                  // console.log("E",divEmail);
                  case "website":
                    newusers[i][key] = inputWebsite.value;
                    break;
                  // console.log("W",divWebsite);
                  case "address":
                    newusers[i][key] = inputAddress.value;
                    break;
                  // console.log("A",divAddress);
                  case "company":
                    newusers[i][key] = inputCompany.value;
                    break;
                  // console.log("C",divCompany);
                }
              }
              document.body.removeChild(overlay);
              createUsers();
            } else if (type === "add") {
              const obj: any = {};
              obj.name = inputName.value;
              obj.email = inputEmail.value;
              obj.website = inputWebsite.value;
              obj.address = inputAddress.value;
              obj.company = inputCompany.value;

              newusers.push(obj);
              document.body.removeChild(overlay);
              createUsers();
            }
          }
        };

        btnWrapper.appendChild(deactivateBtn);
        btnWrapper.appendChild(cancelBtn);

        // Modalga qo‘shamiz
        modal.appendChild(title);
        modal.appendChild(inputs);
        modal.appendChild(btnWrapper);

        overlay.appendChild(modal);

        // Bodyga qo‘shamiz
        document.body.appendChild(overlay);
      }
    }

    users.innerHTML = "";
    users.appendChild(allUsers);
  }

  setTimeout(() => {
    users.removeChild(loading);
    createUsers();
  }, 100);
});

