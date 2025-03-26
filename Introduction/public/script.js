fetch('/data.json')
.then(response => response.json())
.then(data => {
    const tableBody = document.querySelector('tbody');
    data.people.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${person.name}</td><td>${person.age}</td><td>${person.occupation}</td>`;
        tableBody.appendChild(row);
    });
})