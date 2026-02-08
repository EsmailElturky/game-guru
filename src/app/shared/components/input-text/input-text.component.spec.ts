import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

// Jest timer utilities
jest.useFakeTimers();

import { InputTextComponent } from './input-text.component';
import * as textCaseTransformFn from '../../functions/text-case-transform';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with default values', () => {
      expect(component.value()).toBe('');
      expect(component.disabled()).toBe(false);
      expect(component.inputId()).toBe('chkui-input-text');
      expect(component.inputName()).toBe('chkui-input-text');
      expect(component.placeholder()).toBe('');
      expect(component.readonly()).toBe(false);
      expect(component.hidden()).toBe(false);
      expect(component.allowSpellCheck()).toBe(true);
      expect(component.maxLength()).toBe(250);
      expect(component.allowPaste()).toBe(true);
      expect(component.emitOnBlur()).toBe(true);
      expect(component.inline()).toBe(false);
    });

    it('should initialize textChanged Subject', () => {
      expect(component.textChanged).toBeInstanceOf(Subject);
    });

    it('should setup debounced subscription in constructor', () => {
      const emitSpy = jest.spyOn(component.inputTextChanged, 'emit');
      const onChangeSpy = jest.spyOn(component as any, 'onChange');
      const onTouchedSpy = jest.spyOn(component as any, 'onTouched');

      component.textChanged.next('test value');
      jest.advanceTimersByTime(400); // Wait for debounce

      expect(emitSpy).toHaveBeenCalledWith('test value');
      expect(onChangeSpy).toHaveBeenCalledWith('test value');
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should trim values in debounced subscription', () => {
      const emitSpy = jest.spyOn(component.inputTextChanged, 'emit');
      const onChangeSpy = jest.spyOn(component as any, 'onChange');

      component.textChanged.next('  spaced value  ');
      jest.advanceTimersByTime(400);

      expect(emitSpy).toHaveBeenCalledWith('spaced value');
      expect(onChangeSpy).toHaveBeenCalledWith('spaced value');
    });

    it('should use distinctUntilChanged to prevent duplicate emissions', () => {
      const emitSpy = jest.spyOn(component.inputTextChanged, 'emit');

      component.textChanged.next('same value');
      jest.advanceTimersByTime(400);
      component.textChanged.next('same value');
      jest.advanceTimersByTime(400);

      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Input Properties', () => {
    it('should accept custom inputId', () => {
      fixture.componentRef.setInput('inputId', 'custom-id');
      expect(component.inputId()).toBe('custom-id');
    });

    it('should accept custom inputName', () => {
      fixture.componentRef.setInput('inputName', 'custom-name');
      expect(component.inputName()).toBe('custom-name');
    });

    it('should accept custom placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Enter text here');
      expect(component.placeholder()).toBe('Enter text here');
    });

    it('should accept readonly state', () => {
      fixture.componentRef.setInput('readonly', true);
      expect(component.readonly()).toBe(true);
    });

    it('should accept hidden state', () => {
      fixture.componentRef.setInput('hidden', true);
      expect(component.hidden()).toBe(true);
    });

    it('should accept allowSpellCheck setting', () => {
      fixture.componentRef.setInput('allowSpellCheck', false);
      expect(component.allowSpellCheck()).toBe(false);
    });

    it('should accept custom maxLength', () => {
      fixture.componentRef.setInput('maxLength', 100);
      expect(component.maxLength()).toBe(100);
    });

    it('should accept zero maxLength', () => {
      fixture.componentRef.setInput('maxLength', 0);
      expect(component.maxLength()).toBe(0);
    });

    it('should accept allowPaste setting', () => {
      fixture.componentRef.setInput('allowPaste', false);
      expect(component.allowPaste()).toBe(false);
    });

    it('should accept emitOnBlur setting', () => {
      fixture.componentRef.setInput('emitOnBlur', false);
      expect(component.emitOnBlur()).toBe(false);
    });

    it('should accept inline setting', () => {
      fixture.componentRef.setInput('inline', true);
      expect(component.inline()).toBe(true);
    });
  });

  describe('ControlValueAccessor Implementation', () => {
    it('should write value correctly', () => {
      component.writeValue('test value');
      expect(component.value()).toBe('test value');
    });

    it('should handle null value in writeValue', () => {
      component.writeValue(null);
      expect(component.value()).toBe('');
    });

    it('should handle undefined value in writeValue', () => {
      component.writeValue(undefined as any);
      expect(component.value()).toBe('');
    });

    it('should handle empty string in writeValue', () => {
      component.writeValue('');
      expect(component.value()).toBe('');
    });

    it('should register onChange callback', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);

      // Access private onChange to test it was registered
      (component as any).onChange('test');
      expect(onChangeSpy).toHaveBeenCalledWith('test');
    });

    it('should register onTouched callback', () => {
      const onTouchedSpy = jest.fn();
      component.registerOnTouched(onTouchedSpy);

      // Access private onTouched to test it was registered
      (component as any).onTouched();
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should set disabled state to true', () => {
      component.setDisabledState(true);
      expect(component.disabled()).toBe(true);
    });

    it('should set disabled state to false', () => {
      component.setDisabledState(false);
      expect(component.disabled()).toBe(false);
    });

    it('should toggle disabled state correctly', () => {
      expect(component.disabled()).toBe(false);

      component.setDisabledState(true);
      expect(component.disabled()).toBe(true);

      component.setDisabledState(false);
      expect(component.disabled()).toBe(false);
    });
  });

  describe('emitInputTextValue Method', () => {
    it('should set value and emit when emitOnBlur is false', () => {
      fixture.componentRef.setInput('emitOnBlur', false);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');

      component.emitInputTextValue('test value');

      expect(component.value()).toBe('test value');
      expect(textChangedSpy).toHaveBeenCalledWith('test value');
    });

    it('should set value but not emit when emitOnBlur is true', () => {
      fixture.componentRef.setInput('emitOnBlur', true);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');

      component.emitInputTextValue('test value');

      expect(component.value()).toBe('test value');
      expect(textChangedSpy).not.toHaveBeenCalled();
    });

    it('should trim value before setting and emitting', () => {
      fixture.componentRef.setInput('emitOnBlur', false);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');

      component.emitInputTextValue('  spaced value  ');

      expect(component.value()).toBe('spaced value');
      expect(textChangedSpy).toHaveBeenCalledWith('spaced value');
    });

    it('should handle empty string correctly', () => {
      fixture.componentRef.setInput('emitOnBlur', false);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');

      component.emitInputTextValue('');

      expect(component.value()).toBe('');
      expect(textChangedSpy).toHaveBeenCalledWith('');
    });

    it('should handle whitespace-only string correctly', () => {
      fixture.componentRef.setInput('emitOnBlur', false);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');

      component.emitInputTextValue('   ');

      expect(component.value()).toBe('');
      expect(textChangedSpy).toHaveBeenCalledWith('');
    });

    it('should handle special characters correctly', () => {
      fixture.componentRef.setInput('emitOnBlur', false);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');

      component.emitInputTextValue('  @#$%^&*()  ');

      expect(component.value()).toBe('@#$%^&*()');
      expect(textChangedSpy).toHaveBeenCalledWith('@#$%^&*()');
    });
  });

  describe('onBlur Method', () => {
    let textCaseTransformSpy: jest.SpyInstance;

    beforeEach(() => {
      textCaseTransformSpy = jest
        .spyOn(textCaseTransformFn, 'textCaseTransform')
        .mockImplementation((value, textCase) => value);
    });

    it('should handle empty value on blur', () => {
      const bluredSpy = jest.spyOn(component.inputTextBlured, 'emit');
      component.value.set('');

      component.onBlur();
      expect(textCaseTransformSpy).not.toHaveBeenCalled();
      expect(bluredSpy).toHaveBeenCalledWith('');
    });

    it('should handle whitespace value on blur', () => {
      const bluredSpy = jest.spyOn(component.inputTextBlured, 'emit');
      component.value.set('   ');

      component.onBlur();
      expect(textCaseTransformSpy).not.toHaveBeenCalled();
      expect(bluredSpy).toHaveBeenCalledWith('');
    });

    it('should emit inputTextBlured with current value', () => {
      const bluredSpy = jest.spyOn(component.inputTextBlured, 'emit');
      component.value.set('test value');

      component.onBlur();
      expect(textCaseTransformSpy).toHaveBeenCalled();
      expect(bluredSpy).toHaveBeenCalledWith('test value');
    });

    it('should emit to textChanged when emitOnBlur is true', () => {
      fixture.componentRef.setInput('emitOnBlur', true);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');
      component.value.set('test value');

      component.onBlur();
      expect(textCaseTransformSpy).toHaveBeenCalled();
      expect(textChangedSpy).toHaveBeenCalledWith('test value');
    });

    it('should not emit to textChanged when emitOnBlur is false', () => {
      fixture.componentRef.setInput('emitOnBlur', false);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');
      component.value.set('test value');

      component.onBlur();
      expect(textCaseTransformSpy).toHaveBeenCalled();
      expect(textChangedSpy).not.toHaveBeenCalled();
    });

    it('should emit both events correctly when emitOnBlur is true', () => {
      fixture.componentRef.setInput('emitOnBlur', true);
      const bluredSpy = jest.spyOn(component.inputTextBlured, 'emit');
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');
      component.value.set('blur test');

      component.onBlur();
      expect(textCaseTransformSpy).toHaveBeenCalled();
      expect(bluredSpy).toHaveBeenCalledWith('blur test');
      expect(textChangedSpy).toHaveBeenCalledWith('blur test');
    });

    it('should handle empty string in writeValue', () => {
      component.writeValue('');
      expect(component.value()).toBe('');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle rapid successive calls to emitInputTextValue', () => {
      fixture.componentRef.setInput('emitOnBlur', false);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');

      component.emitInputTextValue('value1');
      component.emitInputTextValue('value2');
      component.emitInputTextValue('value3');

      expect(component.value()).toBe('value3');
      expect(textChangedSpy).toHaveBeenCalledTimes(3);
      expect(textChangedSpy).toHaveBeenCalledWith('value3');
    });

    it('should handle rapid successive blur events', () => {
      const bluredSpy = jest.spyOn(component.inputTextBlured, 'emit');
      component.value.set('blur test');

      component.onBlur();
      component.onBlur();
      component.onBlur();
      expect(bluredSpy).toHaveBeenCalledTimes(3);
    });

    it('should handle null/undefined in registerOnChange', () => {
      // Test that registering null doesn't throw
      expect(() => {
        component.registerOnChange(null);
      }).not.toThrow();

      // Test that registering undefined doesn't throw
      expect(() => {
        component.registerOnChange(undefined);
      }).not.toThrow();

      // Test that calling with null callback throws (expected behavior)
      component.registerOnChange(null);
      expect(() => {
        (component as any).onChange('test');
      }).toThrow();
    });

    it('should handle null/undefined in registerOnTouched', () => {
      // Test that registering null doesn't throw
      expect(() => {
        component.registerOnTouched(null);
      }).not.toThrow();

      // Test that registering undefined doesn't throw
      expect(() => {
        component.registerOnTouched(undefined);
      }).not.toThrow();

      // Test that calling with null callback throws (expected behavior)
      component.registerOnTouched(null);
      expect(() => {
        (component as any).onTouched();
      }).toThrow();
    });

    it('should handle very long strings within maxLength', () => {
      const longString = 'a'.repeat(250);
      fixture.componentRef.setInput('emitOnBlur', false);

      component.emitInputTextValue(longString);

      expect(component.value()).toBe(longString);
    });

    it('should handle unicode characters correctly', () => {
      const unicodeString = '🚀 Hello 世界 🌍';
      fixture.componentRef.setInput('emitOnBlur', false);

      component.emitInputTextValue(unicodeString);

      expect(component.value()).toBe(unicodeString);
    });
  });

  describe('removeText Method', () => {
    it('should clear the input value', () => {
      // Arrange
      component.value.set('initial value');
      
      // Act
      component.removeText();
      
      // Assert
      expect(component.value()).toBe('');
    });

    it('should emit textChanged with empty string', () => {
      // Arrange
      component.value.set('some text');
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');
      
      // Act
      component.removeText();
      
      // Assert
      expect(textChangedSpy).toHaveBeenCalledWith('');
    });

    it('should work when value is already empty', () => {
      // Arrange
      component.value.set('');
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');
      
      // Act
      component.removeText();
      
      // Assert
      expect(component.value()).toBe('');
      expect(textChangedSpy).toHaveBeenCalledWith('');
    });

    it('should trigger debounced inputTextChanged emission', () => {
      // Arrange
      component.value.set('text to remove');
      const inputTextChangedSpy = jest.spyOn(component.inputTextChanged, 'emit');
      
      // Act
      component.removeText();
      
      // Fast-forward time to trigger debounced emission
      jest.advanceTimersByTime(400);
      
      // Assert
      expect(inputTextChangedSpy).toHaveBeenCalledWith('');
    });

    it('should call onChange callback with empty string after debounce', () => {
      // Arrange
      component.value.set('text to clear');
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);
      
      // Act
      component.removeText();
      
      // Fast-forward time to trigger debounced callback
      jest.advanceTimersByTime(400);
      
      // Assert
      expect(onChangeSpy).toHaveBeenCalledWith('');
    });

    it('should call onTouched callback after debounce', () => {
      // Arrange
      component.value.set('text to clear');
      const onTouchedSpy = jest.fn();
      component.registerOnTouched(onTouchedSpy);
      
      // Act
      component.removeText();
      
      // Fast-forward time to trigger debounced callback
      jest.advanceTimersByTime(400);
      
      // Assert
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('Integration Tests', () => {
    it('should work correctly in emitOnBlur=false mode end-to-end', () => {
      fixture.componentRef.setInput('emitOnBlur', false);
      const changedSpy = jest.spyOn(component.inputTextChanged, 'emit');
      const bluredSpy = jest.spyOn(component.inputTextBlured, 'emit');
      const onChangeSpy = jest.spyOn(component as any, 'onChange');
      const onTouchedSpy = jest.spyOn(component as any, 'onTouched');

      // Simulate typing
      component.emitInputTextValue('typing test');
      jest.advanceTimersByTime(400);

      // Simulate blur
      component.onBlur();

      expect(component.value()).toBe('typing test');
      expect(changedSpy).toHaveBeenCalledWith('typing test');
      expect(bluredSpy).toHaveBeenCalledWith('typing test');
      expect(onChangeSpy).toHaveBeenCalledWith('typing test');
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should work correctly in emitOnBlur=true mode end-to-end', () => {
      fixture.componentRef.setInput('emitOnBlur', true);
      const changedSpy = jest.spyOn(component.inputTextChanged, 'emit');
      const bluredSpy = jest.spyOn(component.inputTextBlured, 'emit');
      const onChangeSpy = jest.spyOn(component as any, 'onChange');
      const onTouchedSpy = jest.spyOn(component as any, 'onTouched');

      // Simulate typing (should not emit immediately)
      component.emitInputTextValue('typing test');
      expect(changedSpy).not.toHaveBeenCalled();

      // Simulate blur (should emit)
      component.onBlur();
      jest.advanceTimersByTime(400);

      expect(component.value()).toBe('typing test');
      expect(changedSpy).toHaveBeenCalledWith('typing test');
      expect(bluredSpy).toHaveBeenCalledWith('typing test');
      expect(onChangeSpy).toHaveBeenCalledWith('typing test');
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should handle form integration correctly', () => {
      const onChangeSpy = jest.fn();
      const onTouchedSpy = jest.fn();

      component.registerOnChange(onChangeSpy);
      component.registerOnTouched(onTouchedSpy);
      component.writeValue('form value');

      expect(component.value()).toBe('form value');

      component.setDisabledState(true);
      expect(component.disabled()).toBe(true);
    });
  });

  describe('Conditional Logic Coverage', () => {
    it('should cover all branches in emitInputTextValue', () => {
      // Branch 1: emitOnBlur = false
      fixture.componentRef.setInput('emitOnBlur', false);
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');

      component.emitInputTextValue('test');
      expect(textChangedSpy).toHaveBeenCalled();

      textChangedSpy.mockClear();

      // Branch 2: emitOnBlur = true
      fixture.componentRef.setInput('emitOnBlur', true);
      component.emitInputTextValue('test2');
      expect(textChangedSpy).not.toHaveBeenCalled();
    });

    it('should cover all branches in onBlur', () => {
      const textChangedSpy = jest.spyOn(component.textChanged, 'next');
      const bluredSpy = jest.spyOn(component.inputTextBlured, 'emit');

      // Branch 1: emitOnBlur = false
      fixture.componentRef.setInput('emitOnBlur', false);
      component.onBlur();
      expect(bluredSpy).toHaveBeenCalled();
      expect(textChangedSpy).not.toHaveBeenCalled();

      bluredSpy.mockClear();
      textChangedSpy.mockClear();

      // Branch 2: emitOnBlur = true
      fixture.componentRef.setInput('emitOnBlur', true);
      component.onBlur();
      expect(bluredSpy).toHaveBeenCalled();
      expect(textChangedSpy).toHaveBeenCalled();
    });

    it('should cover null coalescing in writeValue', () => {
      // Test null
      component.writeValue(null);
      expect(component.value()).toBe('');

      // Test undefined
      component.writeValue(undefined as any);
      expect(component.value()).toBe('');

      // Test valid value
      component.writeValue('valid');
      expect(component.value()).toBe('valid');
    });
  });

  describe('Memory Management', () => {
    it('should not cause memory leaks with textChanged subscription', () => {
      const initialSubscriptionCount =
        (component.textChanged as any).observers?.length ?? 0;

      // Create new component instance
      const newFixture = TestBed.createComponent(InputTextComponent);
      const newComponent = newFixture.componentInstance;

      expect(newComponent.textChanged).toBeDefined();
      expect(
        (newComponent.textChanged as any).observers?.length
      ).toBeGreaterThanOrEqual(1);

      newFixture.destroy();
    });
  });
});
