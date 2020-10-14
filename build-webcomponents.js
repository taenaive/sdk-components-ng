const fs = require('fs-extra');
const concat = require('concat');
const cheerio = require('cheerio');

(async function build() {
  const files = [
    './dist/@senzing/sdk-components-web/runtime.js',
    './dist/@senzing/sdk-components-web/polyfills.js',
    './dist/@senzing/sdk-components-web/main.js'
  ];

  await fs.ensureDir('./dist/@senzing/sdk-components-web/');
  // files may or may not exist depending on type of build
  if(await fs.exists('./dist/@senzing/sdk-components-web/styles.js')){
    files.push('./dist/@senzing/sdk-components-web/styles.js');
  }
  if(await fs.exists('./dist/@senzing/sdk-components-web/vendor.js')){
    files.push('./dist/@senzing/sdk-components-web/vendor.js');
  }
  // concat all files together
  await concat(files, './dist/@senzing/sdk-components-web/senzing-components-web.js');
  // copy styles
  if(await fs.exists('./node_modules/@senzing/sdk-components-ng/styles')){
    await fs.copy(
      './node_modules/@senzing/sdk-components-ng/styles',
      './dist/@senzing/sdk-components-web/styles'
    ).catch(()=>{ console.log('build error #1'); });
  }

  if(await fs.exists('./dist/@senzing/sdk-components-web/styles.css')){
    // concat
    fs.rename('./dist/@senzing/sdk-components-web/styles.css', './dist/@senzing/sdk-components-web/senzing-components-web.css');
    /*
    await fs.copy(
      './dist/@senzing/sdk-components-web/styles/styles.css',
      './dist/@senzing/sdk-components-web/senzing-components-web.css'
    ).catch((err)=>{ console.log('build error #2', err); });
    */
    console.log('renamed styles.css to senzing-components-web.css');
  } else {
    console.log('styles.css doesn\'t exist');
  }
  await fs.copyFile(
    './sdk-components-web/package.json',
    './dist/@senzing/sdk-components-web/package.json'
  ).catch(()=>{ console.log('build error #3'); });
  await fs.copyFile(
    './sdk-components-web/README.md',
    './dist/@senzing/sdk-components-web/README.md'
  ).catch(()=>{ console.log('build error #4'); });

  // remove extraneous files
  if(await fs.exists('./dist/@senzing/sdk-components-web/favicon.ico')){
    await fs.remove('./dist/@senzing/sdk-components-web/favicon.ico').catch(()=>{ console.log('build error #5'); });
  }
  if(await fs.exists('./dist/@senzing/sdk-components-web/polyfills.js')){
    await fs.remove('./dist/@senzing/sdk-components-web/polyfills.js').catch(()=>{ console.log('build error #6'); });
  }
  if(await fs.exists('./dist/@senzing/sdk-components-web/runtime.js')){
    await fs.remove('./dist/@senzing/sdk-components-web/runtime.js').catch(()=>{ console.log('build error #7'); });
  }
  if(await fs.exists('./dist/@senzing/sdk-components-web/styles.js')){
    await fs.remove('./dist/@senzing/sdk-components-web/styles.js').catch(()=>{ console.log('build error #8'); });
  }
  if(await fs.exists('./dist/@senzing/sdk-components-web/vendor.js')){
    await fs.remove('./dist/@senzing/sdk-components-web/vendor.js').catch(()=>{ console.log('build error #9'); });
  }
  if(await fs.exists('./dist/@senzing/sdk-components-web/main.js')){
    await fs.remove('./dist/@senzing/sdk-components-web/main.js').catch(()=>{ console.log('build error #10'); });
  }

  // rename index.html to example.html
  await fs.rename('./dist/@senzing/sdk-components-web/index.html','./dist/@senzing/sdk-components-web/dev.html').catch(()=>{ console.log('build error #8'); });

  // replace script refs in example.html
  await fs.readFile((__dirname + '/dist/@senzing/sdk-components-web/dev.html'), {encoding: 'utf8'}, (error, data) => {
    if(error){
      console.log('build error #11');
      return;
    }
    var $ = cheerio.load(data); // load in the HTML into cheerio
    // remove base
    $('base').remove();

    // remove all other scripts
    $('script[src="runtime.js"]').remove();
    $('script[src="polyfills.js"]').remove();
    $('script[src="styles.js"]').remove();
    $('script[src="vendor.js"]').remove();

    // replace with bundle script
    $('script[src="main.js"]').attr('src','senzing-components-web.js');

    // replace stylesheet with bundled one
    $('link[href="styles.css"]').attr('href', 'senzing-components-web.css');

    // write file
    fs.writeFile((__dirname + '/dist/@senzing/sdk-components-web/index.html'), $.html(), (error) => {
      if(error){
        console.error('build error #12');
        return;
      }
      // now remove original
      /*
      fs.remove('./dist/@senzing/sdk-components-web/index.html', (err)=>{
        if(err){
          console.log('build error #10');
        }
      });
      */
    });
  });

})();
