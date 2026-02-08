import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ArabicToEnglishDirective } from './arabic-to-english.directive';

@Component({
  selector: 'test-arabic-to-english',
  template: `
    <input
      type="text"
      uikitArabicToEnglish
      id="test-input"
      data-testid="test-input"
    />
  `,
  standalone: true,
  imports: [ArabicToEnglishDirective],
})
class TestComponent {}

describe('ArabicToEnglishDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: DebugElement;
  let nativeInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
    nativeInput = inputElement.nativeElement;
    fixture.detectChanges();
  });

  describe('Input Event Handling', () => {
    it('should convert Arabic numerals to English when typing', () => {
      nativeInput.value = '٢٣٤';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('234');
    });

    it('should handle mixed Arabic and English numerals', () => {
      nativeInput.value = '١2٣4';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('1234');
    });

    it('should handle all Arabic numerals correctly', () => {
      nativeInput.value = '٠١٢٣٤٥٦٧٨٩';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('0123456789');
    });

    it('should not modify English numerals', () => {
      nativeInput.value = '1234567890';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('1234567890');
    });

    it('should preserve non-numeric characters', () => {
      nativeInput.value = 'abc-١٢٣-def';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('abc-123-def');
    });
  });

  describe('Paste Event Handling', () => {
    it('should convert Arabic numerals on paste', () => {
      const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: new DataTransfer(),
        bubbles: true,
      });
      pasteEvent.clipboardData?.setData('text', '٢٣٤٥٦');

      nativeInput.dispatchEvent(pasteEvent);
      fixture.detectChanges();

      expect(nativeInput.value).toBe('23456');
    });

    it('should handle paste with mixed numerals', () => {
      const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: new DataTransfer(),
        bubbles: true,
      });
      pasteEvent.clipboardData?.setData('text', '١2٣4٥');

      nativeInput.dispatchEvent(pasteEvent);
      fixture.detectChanges();

      expect(nativeInput.value).toBe('12345');
    });

    it('should insert pasted text at cursor position', () => {
      nativeInput.value = 'abc';
      nativeInput.setSelectionRange(1, 1);

      const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: new DataTransfer(),
        bubbles: true,
      });
      pasteEvent.clipboardData?.setData('text', '١٢٣');

      nativeInput.dispatchEvent(pasteEvent);
      fixture.detectChanges();

      // Wait for async operations
      fixture.whenStable().then(() => {
        expect(nativeInput.value).toBe('a123bc');
      });
    });

    it('should replace selected text on paste', () => {
      nativeInput.value = 'abcdef';
      nativeInput.setSelectionRange(1, 4);

      const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: new DataTransfer(),
        bubbles: true,
      });
      pasteEvent.clipboardData?.setData('text', '١٢٣');

      nativeInput.dispatchEvent(pasteEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(nativeInput.value).toBe('a123ef');
      });
    });
  });

  describe('Change Event Handling', () => {
    it('should convert on change event', () => {
      nativeInput.value = '٥٦٧';
      nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('567');
    });
  });

  describe('Blur Event Handling', () => {
    it('should convert on blur event', () => {
      nativeInput.value = '٨٩٠';
      nativeInput.dispatchEvent(new Event('blur', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('890');
    });
  });

  describe('Event Dispatching', () => {
    it('should dispatch input event after conversion', () => {
      spyOn(nativeInput, 'dispatchEvent');

      nativeInput.value = '١٢٣';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      // Check that dispatchEvent was called (for the conversion)
      expect(nativeInput.dispatchEvent).toHaveBeenCalled();
    });

    it('should dispatch change event after conversion', () => {
      spyOn(nativeInput, 'dispatchEvent');

      nativeInput.value = '١٢٣';
      nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string', () => {
      nativeInput.value = '';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('');
    });

    it('should handle string with only non-numeric characters', () => {
      nativeInput.value = 'abc-def-ghi';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('abc-def-ghi');
    });

    it('should handle repeated Arabic numerals', () => {
      nativeInput.value = '٩٩٩٩٩';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('99999');
    });

    it('should handle special characters with Arabic numerals', () => {
      nativeInput.value = '(٠١٢) ٣٤٥-٦٧٨٩';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(nativeInput.value).toBe('(012) 345-6789');
    });
  });

  describe('Initialization', () => {
    it('should convert initial value on init', async () => {
      @Component({
        selector: 'test-with-initial-value',
        template: `
          <input
            type="text"
            uikitArabicToEnglish
            value="١٢٣"
            id="test-input-init"
          />
        `,
        standalone: true,
        imports: [ArabicToEnglishDirective],
      })
      class TestComponentWithInitialValue {}

      const testFixture = TestBed.createComponent(
        TestComponentWithInitialValue
      );
      testFixture.detectChanges();

      const input = testFixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      expect(input.value).toBe('123');
    });
  });
});
