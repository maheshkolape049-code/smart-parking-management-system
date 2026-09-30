const slotsBox = document.getElementById("slots");
const slotSelect = document.getElementById("slot");
const message = document.getElementById("message");

async function loadSlots(){
  const res = await fetch("/api/slots");
  const slots = await res.json();

  const available = slots.filter(s => s.status === "available").length;
  const booked = slots.length - available;

  document.getElementById("total").textContent = slots.length;
  document.getElementById("available").textContent = available;
  document.getElementById("booked").textContent = booked;

  slotsBox.innerHTML = slots.map(s => `
    <div class="slot ${s.status === "booked" ? "booked" : ""}">
      Slot ${s.slot_number}
      <small>${s.status === "available" ? "Available" : "Booked"}</small>
    </div>
  `).join("");

  slotSelect.innerHTML = slots
    .filter(s => s.status === "available")
    .map(s => `<option value="${s.slot_number}">Slot ${s.slot_number}</option>`)
    .join("");

  if (!available) slotSelect.innerHTML = "<option>No slot available</option>";
}

document.getElementById("form").addEventListener("submit", async e => {
  e.preventDefault();
  message.textContent = "";

  const res = await fetch("/api/book", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      vehicle:document.getElementById("vehicle").value,
      owner:document.getElementById("owner").value,
      slot:Number(slotSelect.value)
    })
  });

  const data = await res.json();
  message.textContent = data.message;
  message.className = res.ok ? "success" : "error";

  if(res.ok){
    e.target.reset();
    await loadSlots();
  }
});

loadSlots();
