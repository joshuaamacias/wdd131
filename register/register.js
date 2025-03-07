document.addEventListener("DOMContentLoaded", () => {
    // Initialize participant count
    let participantCount = 1;

    // Function to create a participant template with unique IDs
    function participantTemplate(count) {
        return `
        <section class="participant${count}">
            <p>Participant ${count}</p>
            <div class="item">
                <label for="fname${count}"> First Name<span>*</span></label>
                <input id="fname${count}" type="text" name="fname${count}" required />
            </div>
            <div class="item activities">
                <label for="activity${count}">Activity #<span>*</span></label>
                <input id="activity${count}" type="text" name="activity${count}" />
            </div>
            <div class="item">
                <label for="fee${count}">Fee ($)<span>*</span></label>
                <input id="fee${count}" type="number" name="fee${count}" />
            </div>
            <div class="item">
                <label for="date${count}">Desired Date <span>*</span></label>
                <input id="date${count}" type="date" name="date${count}" />
            </div>
            <div class="item">
                <p>Grade</p>
                <select name="grade${count}">
                    <option selected value="" disabled></option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                    <option value="5">5th</option>
                    <option value="6">6th</option>
                    <option value="7">7th</option>
                    <option value="8">8th</option>
                    <option value="9">9th</option>
                    <option value="10">10th</option>
                    <option value="11">11th</option>
                    <option value="12">12th</option>
                </select>
            </div>
        </section>`;
    }

    // Function to calculate total fees
    function totalFees() {
        let feeElements = document.querySelectorAll("[id^=fee]");
        feeElements = [...feeElements]; // Convert NodeList to Array
        const total = feeElements.reduce((sum, element) => {
            const fee = parseFloat(element.value) || 0; // Convert to number or default to 0
            return sum + fee;
        }, 0);
        return total;
    }

    // Function to generate the success template
    function successTemplate(info) {
        return `
            <h2>Thank you ${info.adultName} for registering.</h2>
            <p>You have registered ${info.participants} participants and owe $${info.totalFees.toFixed(2)} in Fees.</p>
        `;
    }

    // Function to handle form submission
    function submitForm(event) {
        event.preventDefault(); // Prevent page reload

        const total = totalFees(); // Get total fees
        const adultName = document.getElementById("adult_name").value || "Guest";

        // Create info object for the success template
        const info = {
            adultName: adultName,
            participants: participantCount,
            totalFees: total
        };

        // Hide the form and show the summary
        const form = document.querySelector("form");
        const summarySection = document.getElementById("summary");
        form.classList.add("hide"); // Use CSS class to hide form
        summarySection.innerHTML = successTemplate(info);
        summarySection.classList.remove("hide"); // Show the summary
    }

    // Event listener for "Add Participant" button
    const addButton = document.getElementById("add");
    addButton.addEventListener("click", () => {
        participantCount += 1; // Increment participant count
        const newParticipant = participantTemplate(participantCount);
        addButton.insertAdjacentHTML("beforebegin", newParticipant);
    });

    // Event listener for form submission
    const form = document.querySelector("form");
    form.addEventListener("submit", submitForm);
});
