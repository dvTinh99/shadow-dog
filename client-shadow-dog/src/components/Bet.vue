<template>
    <div id="bet">
          <button type="button" class="btn btn-primary">5.000</button>
          <button type="button" class="btn btn-success">10.000</button>
          <button type="button" class="btn btn-info">20.000</button>
          <button type="button" class="btn btn-secondary">50.000</button>
          <button type="button" class="btn btn-success">100.000</button>
          <button type="button" class="btn btn-info">200.000</button>
          <button type="button" class="btn btn-danger">1.000.000</button>
          <button type="button" class="btn btn-dark">2.000.000</button>
      </div>
</template>
<style scope>

@media only screen and (max-width: 768px) {
    #bet {
        box-sizing: border-box;
        padding: 10px;
        display: grid;
        row-gap: 17px;
        column-gap: 15px;
        grid-template-columns: auto auto;
    }
}

@media only screen and (min-width: 768px) {
    #bet {
        box-sizing: border-box;
        padding: 10px;
        display: grid;
        row-gap: 17px;
        column-gap: 15px;
        grid-template-columns: auto auto auto auto;
    }
}
</style>