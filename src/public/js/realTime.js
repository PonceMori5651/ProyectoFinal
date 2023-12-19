const socket = io()
//console.log(socket)
const formProduct = document.getElementById('formProduct')
const titleInput = document.getElementById('title')
const descriptionInput = document.getElementById('description')
const priceInput = document.getElementById('price')
const codeInput = document.getElementById('code')
const stockInput = document.getElementById('stock')
const categoryInput = document.getElementById('category')

formProduct.addEventListener('submit',(event)=>{
    event.preventDefault()
    const title = titleInput.value
    const description = descriptionInput.value
    const price = priceInput.value
    const code = codeInput.value
    const stock = stockInput.value
    const category = categoryInput.value
    socket.emit('newProductCaS',JSON.stringify({title,description,price,code,stock,category}))
})
const table = document.getElementById('tableProductsData')
socket.on('newProductSaC',data=>{
    const product = JSON.parse(data)
    const productHTML = `
    <tr id="deleted_${product._id}">
        <td>${product._id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td>${product.status}</td>
        <td><button class="deleteButton" id="deleteButton_${product._id}" onclick="deleteProduct('${product._id}')">Borrar</button></td>
    </tr>
    `
    
    table.innerHTML += productHTML
})

const deleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
}

socket.on('productoBorrado',async idP=>{
    document.getElementById(idP).remove()
})