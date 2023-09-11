const deleteButton = document.querySelector('.delete-button')
async function deleteDrink(e) {
  e.preventDefault()
  const check = await swal({
    title: "確定刪除資料?",
    icon: "warning",
    text: "刪除的資料將無法恢復",
    buttons: true,
    dangerMode: true
  })

  if (check) {
    console.log(e.target.dataset.id)
    await fetch(`/admin/drinks/${e.target.dataset.id}/delete`, {
      method: "DELETE"
    })
    window.location.href = "/admin/drinks"
  }
}
deleteButton.addEventListener('click', deleteDrink)