(function () {

  const log = /*console.debug;*/ () => { };

  const sectionLookupMap = new WeakMap();
  let sections = [];

  window.addEventListener('load', init);
  window.confirmElementHasValue = confirmElementHasValue;

  function init() {
    log('init');
    const form = document.getElementById('inputform');

    sections = Array.from(form.getElementsByClassName('card-body')).map(section => ({
      section,
      inputs: Array.from(section.getElementsByTagName('input')),
      selects: Array.from(section.getElementsByTagName('select'))
    }));

    sections.forEach(section => {
      section.all = [...section.inputs, ...section.selects];

      // section.backgroundMap = new WeakMap();
      section.all.forEach(elem => {
        sectionLookupMap.set(elem, section);

        // section.backgroundMap.set(elem, elem.style.backgroundColor);
        // elem.style.backgroundColor = 'orange';
      })
    });


    form.addEventListener('change', onFormInputChanged)

    checkFormInputElements();
  }



  function lockSection(section) {
    const { style } = section.section;
    style.display = 'none';
    style.height = '0';
    style.overflow = 'hidden';
  }

  function unlockSection(section) {
    const { style } = section.section;
    style.display = '';
    style.height = '';
    style.overflow = '';
  }

  function onFormInputChanged(e) {
    const { target } = e;
    if (!sectionLookupMap.has(target)) return log('target not on input list')

    confirmElementHasValue(target);
  }

  function confirmSectionFill(section) {
    const index = sections.indexOf(section);
    const isSectionFilled = section.all.every(x => confirmElementHasValue(x, false));
    if (isSectionFilled) {
      if (index < sections.length - 1) {
        unlockSection(sections[index + 1]);
        confirmSectionFill(sections[index + 1]);
      }
    } else {
      sections.slice(index + 1).forEach(lockSection);
    }

  }

  function confirmElementHasValue(target, checkSectionFill = true) {
    if (!sectionLookupMap.has(target)) return log('target not on input list')
    const section = sectionLookupMap.get(target);

    if (checkSectionFill) {
      confirmSectionFill(section);
    }

    if (target.value.toString().trim().length) {
      // target.style.backgroundColor = section.backgroundMap.get(target);
      return true;
    } else {
      // target.style.backgroundColor = 'orange';
      return false;
    }
  }

  function checkFormInputElements() {
    sections.forEach(section => {
      confirmSectionFill(section);
      section.all.forEach(confirmElementHasValue, false);
    });
  }


  // #region quick-fill - for quickly testing and filling out input/select elements
  // document.addEventListener('keyup', onKeyUp);

  function onKeyUp(e) {
    if ('1234'.indexOf(e.key) === -1) return;
    const key = +e.key - 1;
    if (e.altKey)
      demoFillSection && demoFillSection(key);
  }

  function demoFillSection(index) {
    const section = sections[index];
    if (!section) return log(`Missing section with index ${index}`);

    let targets = section.all.slice(0).reverse();

    const triggerChange = x => x.dispatchEvent(new Event('change', { bubbles: true }));
    const methods = {
      input: x => x.value = x.type == "date" ? '2021-09-24' : 1,
      select: x => x.value = 1
    }
    const fillElem = target => {
      const tagname = target.tagName.toLowerCase();
      methods[tagname](target);
      triggerChange(target);
    }

    const delayedNextElementFill = () => {
      setTimeout(() => {
        fillElem(targets.pop());
        if (targets.length) delayedNextElementFill();
      }, 200);
    }
    delayedNextElementFill();
  }
  // #endregion quick-fill
})();