const { Button, TextArea, Dropdown } = require('semantic-ui-react');
const sinon = require('sinon');

const notHidden = v => !v.parents({ hidden: true }).exists();

const findEditableField = (app, enzymeSelector) => {
    const wrapper = app.find(enzymeSelector).filterWhere(notHidden);
    const input = wrapper.filter('input');
    return input.exists() ? input : wrapper.filter(TextArea);
};

const findDropdown = (app, enzymeSelector) => {
    const wrapper = app.find(enzymeSelector).filterWhere(notHidden);
    const dropdown = wrapper.filter(Dropdown);
    return dropdown.exists() ? dropdown : wrapper.filter({ role: 'combobox' });
};

class Forms {
    static changeFields = formFields => props =>
        Object.entries(formFields).forEach(([name, value]) =>
            Forms.simulateChange(value, { name })(props),
        );

    static simulateChange = (value, enzymeSelector) => ({ app }) => {
        const input = findEditableField(app, enzymeSelector);
        if (input.exists()) {
            const target = input.instance();
            target.value = value;
            const clock = sinon.useFakeTimers(Date.now());
            input.simulate('change', { target });
            clock.runAll(); // use sinon to fast-forward timeout for debounced fields
            clock.restore();
        } else {
            findDropdown(app, enzymeSelector)
                .find(`DropdownItem[text="${value}"]`)
                .simulate('click');
        }
    };

    static clickButton = (button, section) => ({ app }) => {
        const wrapper = section ? app.find(section) : app;
        wrapper
            .find(Button)
            .filter(button)
            .filterWhere(notHidden)
            .first()
            .simulate('click');
    };

    static selectAddress = value => props => {
        Forms.simulateChange(value, 'PlacesAutocomplete input.search')(props);
        props.app.update();
        Forms.simulateChange(value, 'PlacesAutocomplete [role="combobox"]')(props);
    };

    static submitForm = () => ({ app }) => app.find('form').simulate('submit');
}

module.exports = Forms;
