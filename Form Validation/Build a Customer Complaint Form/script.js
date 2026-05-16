const fields = {
  "full-name": document.getElementById("full-name"),
  "email": document.getElementById("email"),
  "order-no": document.getElementById("order-no"),
  "product-code": document.getElementById("product-code"),
  "quantity": document.getElementById("quantity"),
  "complaints-group": document.getElementById("complaints-group"),
  "complaint-description": document.getElementById("complaint-description"),
  "solutions-group": document.getElementById("solutions-group"),
  "solution-description": document.getElementById("solution-description"),
};

const validators = {
  "full-name": () => fields["full-name"].value.trim() !== "",
  "email": () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields["email"].value.trim()),
  "order-no": () => /^2024\d{6}$/.test(fields["order-no"].value.trim()),
  "product-code": () => /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/.test(fields["product-code"].value.trim()),
  "quantity": () => Number.isInteger(Number(fields["quantity"].value)) && Number(fields["quantity"].value) > 0,
  "complaints-group": () => document.querySelectorAll('input[name="complaint"]:checked').length > 0,
  "complaint-description": () => document.getElementById("other-complaint").checked ? fields["complaint-description"].value.trim().length >= 20 : true,
  "solutions-group": () => !!document.querySelector('input[name="solutions"]:checked'),
  "solution-description": () => document.getElementById("other-solution").checked ? fields["solution-description"].value.trim().length >= 20 : true,
};

const validateForm = () => Object.fromEntries(Object.entries(validators).map(([k, fn]) => [k, fn()]));

const isValid = (obj) => Object.values(obj).every(Boolean);

const setColor = (el, valid) => el.style.borderColor = valid ? "green" : "red";

const getTarget = (key) => ["complaints-group", "solutions-group"].includes(key) ? fields[key] : document.querySelector(`[id="${key}"], [name="${key}"]`) ?? fields[key];

document.getElementById("form").addEventListener("change", (e) => {
  const key = Object.keys(fields).find(k => fields[k].contains(e.target));
  if (key) setColor(getTarget(key), validators[key]());
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const results = validateForm();
  Object.entries(results).forEach(([key, valid]) => setColor(getTarget(key), valid));
  const box = document.getElementById("message-box");
  box.style.color = isValid(results) ? "green" : "red";
  box.textContent = isValid(results) ? "Form submitted successfully!" : "Please fill in all required fields correctly.";
});
