1. Code do not have nested SetTimeout, that is why I do not use promises. It would be better to implement promise for operation after kickanimation, but task to connect promise to animation was difficult for me.
2. Magic number: done
3. Functions are longer then 40 rows: done
4. Ternary operators are used in simple cases
5. Pure functions: done for about 50% of Functions
6. Meaningful variables: seems done
7. Webpack...: done
8. Modal dialog: src/app/shared/selection-value-dialog. 
    Can be used in any places where user can select some value from the combobox.
    It can be called:
    - main-scene.component by button Fight to select spell
    - main-scene.component by ctr keybutton to change screen
9. Loading screen: src/app/shared/info-page.
    Can be used in any places to show information (information is income parameter)
    It is called:
    - app.component onStartGame button
    - app.component onPlayAgain button

