<template>
  <div class="list no-hairlines-md">
  <div class="block-header">Simple Dropdown Autocomplete</div>
  <ul>
    <li class="item-content item-input inline-label">
      <div class="item-inner">
        <div class="item-title item-label">Fruit</div>
        <div class="item-input-wrap">
          <input id="autocomplete-dropdown" type="text" placeholder="Fruit">
        </div>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
import Framework7 from 'framework7'
 var app = new Framework7();
  
export default {
   mounted(){
   return;
console.log(app.autocomplete)

var fruits = ('Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple').split(' ');
    var autocompleteDropdownSimple = app.autocomplete.create({
  inputEl: '#autocomplete-dropdown',
  openIn: 'dropdown',
  source: function (query, render) {
    var results = [];
    if (query.length === 0) {
      render(results);
      return;
    }
    // Find matched items
    for (var i = 0; i < fruits.length; i++) {
      if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
    }
    // Render items by passing array with result items
    render(results);
  }
});
  }
}
</script>

