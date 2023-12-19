const addProductCart = async(id) => {
    // socket.emit('borrarProducto', id)
    const varnull = 'null'
    await fetch(`/api/carts/${varnull}/product/${id}`,{method:"POST"})
    //const cart = await response.json()
    //console.log(cart)
}
