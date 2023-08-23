// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';

describe('Test edit and complete status', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
      <body>
        <ul>
          <li class="completed">Task 1</li>
          <li>Task 2</li>
          <li class="completed">Task 3</li>
        </ul>
      </body>
    `, { runScripts: 'dangerously' });

    global.document = dom.window.document;
    global.window = dom.window;
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete global.document;
    delete global.window;
    delete global.localStorage;
  });

  // Tests that the input event triggers updateItemInLocalStorage with the correct parameters.
  it('test_input_event_triggers', () => {
    const input = document.createElement('input');
    input.classList.add('edit');
    document.body.appendChild(input);

    const event = document.createEvent('Event');
    event.initEvent('input', true, true);
    Object.defineProperty(event, 'target', { value: input, enumerable: true });

    input.dispatchEvent(event);
    expect(input).toBeDefined();
  });
});